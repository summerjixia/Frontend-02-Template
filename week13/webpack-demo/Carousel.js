import {Component } from "./framework.js"

export class Carousel extends Component {
    constructor() {
        super();
        this.attributes = [];
    }
    setAttribute(attr, value) {
        this.attributes[attr] = value;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let attr of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url(${attr})`;
            this.root.appendChild(child);
        }

        let position = 0;
        this.root.addEventListener('mousedown', (event) => {
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
        /*let currentIndex = 0;
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