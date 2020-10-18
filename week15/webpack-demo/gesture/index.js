
export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, properties) {
        let event = new Event(type);
        for (let prop in properties) {
            event[prop] = properties[prop];
        }
        this.element.dispatchEvent(event);
    }
}

export class Listener {
    constructor(element, recognize) {
        let isListeningMouse = false;
        element.addEventListener("mousedown", event => {
            let context = Object.create(null);
            contexts.set(`mouse${1 << event.button}`, context);
            recognize.start(event, context);
            let mousemove = event => {
                let button = 1;
                while (button <= event.buttons) {
                    if (button & event.buttons) {
                        let key;
                        if (button === 2)
                            key = 4;
                        else if (button === 4)
                            key = 2;
                        else key = button;
                        let context = contexts.get(`mouse${key}`);
                        recognize.move(event, context);
                    }
                    button = button << 1;
                }
            }
            let mouseup = event => {
                let context = contexts.get(`mouse${1 << event.button}`);
                recognize.end(event, context);
                contexts.delete(`mouse${1 << event.button}`);
                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                    isListeningMouse = false;
                }
            }
            if (!isListeningMouse) {
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isListeningMouse = true;
            }
        })

        let contexts = new Map();
        element.addEventListener("touchstart", event => {
            for (let touch of event.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognize.start(touch, context);
            }
        })
        element.addEventListener("touchmove", event => {
            if (!event.changedTouches) return;
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognize.move(touch, context);
            }
        })
        element.addEventListener("touchend", event => {
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognize.end(touch, context);
                contexts.delete(touch.identifier);
            }
        })
        element.addEventListener("touchcancel", event => {
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                cancel(touch, context);
                contexts.delete(touch.identifier);
            }
        })

    }
}

//press0.5秒 move移动10px
export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher
    }
    start(point, context) {
        this.dispatcher.dispatch("start", {
            clientX: point.clientX,
            clientY: point.clientY
        });
        Object.assign(context, {
            startX: point.clientX,
            startY: point.clientY,
            isTap: true,
            isPress: false,
            isPan: false,
            points: [{
                t: Date.now(),
                x: point.clientX,
                y: point.clientY
            }]
        })
        context.handler = setTimeout(() => {
            Object.assign(context, {
                isTap: false,
                isPress: true,
                isPan: false,
                handler: null
            })
            this.dispatcher.dispatch("pressstart", {});
        }, 500);
    }

    move(point, context) {
        let panX = point.clientX - context.startX;
        let panY = point.clientY - context.startY;
        if (!context.isPress && panX ** 2 + panY ** 2 > 100) {
            Object.assign(context, {
                isTap: false,
                isPress: false,
                isPan: true,
                //横向划动Y轴差值较小，纵向划动X轴差值较小
                isVertical: Math.abs(panX) < Math.abs(panY)
            })
            this.dispatcher.dispatch("panstart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
            clearTimeout(context.handler)
        }
        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
        }
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }
    end(point, context) {
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {});
            clearTimeout(context.handler)
        }
        if (context.isPress) {
            this.dispatcher.dispatch("pressend", {});
        }
        let v;
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        if (!context.points.length) {
            v = 0;
        } else {
            let d = Math.sqrt((point.clientX - context.points[0].x) ** 2
                + (point.clientY - context.points[0].y) ** 2);
            v = d / (Date.now() - context.points[0].t);
        }
        console.log(v)
        if (v > 1.5) {
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                flick: context.isFlick,
                velocity: v
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }
        if (context.isPan) {
            this.dispatcher.dispatch("panend", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                flick: context.isFlick,
                velocity: v
            });
        }
    }
    cancel(point) {
        clearTimeout(context.handler)
        this.dispatcher.dispatch("cancel", {});
    }
}

//listener=>recognize=>dispatch
export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}

