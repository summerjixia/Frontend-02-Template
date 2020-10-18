import { Component, STATE, ATTRIBUTES } from "../framework"
import { enableGesture } from "../gesture"
import { TimeLine, Animation } from "../animation/animation.js"
export { STATE, ATTRIBUTES } from "../framework"

// 为carouse组件添加animation\gesture事件
// 1.导入gesture并添加gesture的pan移动/panend移动结束事件
// 2.导入animation并开始图片轮播
// 3.当图片轮播时鼠标移动图片，添加gesture的start事件，停止动画并处理动画产生的边角
// 4.当鼠标end时继续图片轮播，改造gesture的panend事件
// 5.flick
//6.提取attrbute属性为父类component组件属性
// 7.内部状态state attrbutes
// 8.position放到state上
// 9.添加click事件
//9.添加children

export class Carousel extends Component {
    constructor() {
        super();
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let attr of this[ATTRIBUTES].src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url(${attr.img})`;
            this.root.appendChild(child);
        }
        let children = this.root.children;
        enableGesture(this.root);
        let handler = null;
        let tl = new TimeLine();
        tl.start();

        this[STATE].position = 0;
        let t = 0;
        let ax = 0;
        this.root.addEventListener("start", (event) => {
            tl.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 280;
            ax = progress * 280 - 280;
        })
        this.root.addEventListener("tap", (event) => {
            this.triggerEvent("click", {
                data: this[ATTRIBUTES].src[this[STATE].position],
                position: this[STATE].position,
            })
        })

        this.root.addEventListener("pan", (event) => {
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 280) / 280);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${-pos * 280 + offset * 280 + x % 280}px)`;
            }
        })
        this.root.addEventListener("panend", (event) => {
            tl.reset();
            tl.start();
            handler = setInterval(nextPicture, 3000);

            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 280) / 280);

            let direction = Math.round((x % 280) / 280);
            if (event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 280) / 280);
                } else {
                    direction = Math.floor((x % 280) / 280);
                }
            }

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                tl.add(new Animation(children[pos].style, "transform",
                    -pos * 280 + offset * 280 + x % 280,
                    -pos * 280 + offset * 280 + direction * 280,
                    0, 280, v => v, v => `translateX(${v}px)`))
            }

            this[STATE].position = this[STATE].position - ((x - x % 280) / 280) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
            this.triggerEvent("Change", { position: this[STATE].position })
        })
        let nextPicture = () => {
            let nextIndex = (this[STATE].position + 1) % children.length

            let current = children[this[STATE].position];
            let next = children[nextIndex];

            t = Date.now();

            tl.add(new Animation(current.style, "transform", - this[STATE].position * 280, -280 - this[STATE].position * 280,
                0, 280, v => v, v => `translateX(${v}px)`))
            tl.add(new Animation(next.style, "transform", 280 - nextIndex * 280, -nextIndex * 280,
                0, 280, v => v, v => `translateX(${v}px)`))

            this[STATE].position = nextIndex;
            this.triggerEvent("change", { position: this[STATE].position })
        }
        handler = setInterval(nextPicture, 3000);
        /* this.root.addEventListener('mousedown', (event) => {
             let children = this.root.children;
             let startX = event.clientX;
             let move = event => {
                 let x = event.clientX - startX;
                 let current = position - ((x - x % 280) / 280)
                 for (let offset of [-1, 0, 1]) {
                     let pos = current + offset;
                     pos = (pos + children.length) % children.length;
                     children[pos].style.transition = "none";
                     children[pos].style.transform = `translateX(${-pos * 280 + offset * 280 + x % 280}px)`;
                 }
 
             }
             let up = event => {
                 let x = event.clientX - startX;
                 position = position - Math.round(x / 280);
                 for (let offset of [0, -Math.sign(Math.round(x / 280) - x + 140 * Math.sign(x))]) {
                     let pos = position + offset;
                     pos = (pos + children.length) % children.length;
                     children[pos].style.transition = "";
                     children[pos].style.transform = `translateX(${-pos * 280 + offset * 280}px)`;
                 }
                 document.removeEventListener("mousemove", move);
                 document.removeEventListener("mouseup", up);
             }
 
             document.addEventListener("mousemove", move);
             document.addEventListener("mouseup", up);
 
         })
         let currentIndex = 0;
         setInterval(() => {
             let children = this.root.children;
             let nextIndex = (currentIndex + 1) % children.length
 
             let current = children[currentIndex];
             let next = children[nextIndex];
 
             next.style.transition = "none";
             next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
 
             setTimeout(() => {
                 next.style.transition = "";//让style标签的transition生效
                 current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
                 next.style.transform = `translateX(${-nextIndex * 100}%)`;
                 currentIndex = nextIndex;
             }, 16);
         }, 3000);*/
        return this.root;
    }

    mount(parent) {
        parent.appendChild(this.render());
    }
}