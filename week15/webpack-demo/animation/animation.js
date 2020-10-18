const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const DONE_ANIMATIONS = Symbol("done-animations");
const START_TIME = Symbol("start-time");
const PAUSE_START_TIME = Symbol("pause-start-time");
const PAUSE_END_TIME = Symbol("pause-end-time");


export class TimeLine {
    constructor() {
        this.state = "inited";
        this[ANIMATIONS] = new Set();
        this[DONE_ANIMATIONS] = new Set();
        //动画开启之后添加进来或者有延迟的，第二个参数为其开始时间
        this[START_TIME] = new Map();
    }

    start() {
        if (this.state !== "inited")
            return;
        this.state = "started";
        let startTime = Date.now();
        this[PAUSE_END_TIME] = 0;
        this[TICK] = () => {
            let now = Date.now();
            for (let animation of this[ANIMATIONS]) {
                let t;
                if (this[START_TIME].get(animation) <= startTime) {
                    console.log(now, startTime);
                    t = now - startTime - this[PAUSE_END_TIME] - animation.delay;
                } else {
                    t = now - this[START_TIME].get(animation) - this[PAUSE_END_TIME] - animation.delay;
                }
                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    this[DONE_ANIMATIONS].add(animation);
                    t = animation.duration;
                }
                if (t > 0) {
                    animation.receive(t);
                }
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
        }
        this[TICK]();
    }

    pause() {
        if (this.state !== "started")
            return;
        this.state = "paused";
        this[PAUSE_START_TIME] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER])
    }
    resume() {
        if (this.state !== "paused")
            return;
        this.state = "started";
        this[PAUSE_END_TIME] += Date.now() - this[PAUSE_START_TIME];
        this[TICK]();
    }
    reset() {
        this.pause();
        this.state = "inited";
        this[TICK_HANDLER] = null;
        for (let animation of this[ANIMATIONS]) {
            animation.object[animation.property] = animation.template(animation.startValue);
        }
        for (let animation of this[DONE_ANIMATIONS]) {
            animation.object[animation.property] = animation.template(animation.startValue);
            this[ANIMATIONS].add(animation);
        }
        this[PAUSE_START_TIME] = 0;
        this[PAUSE_END_TIME] = 0;
    }
    add(animation, startTime = Date.now()) {
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime)
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, delay, duration, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.delay = delay;
        this.duration = duration;
        this.timingFunction = timingFunction;
        this.template = template;
    }

    receive(time) {
        let range = this.endValue - this.startValue;
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }

}