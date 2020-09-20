import { createElement, Component } from "./framework.js"

class Carousel extends Component {
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

        let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex+1) % children.length

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            
            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 -currentIndex * 100})`
                next.style.transform = `translateX(${-nextIndex * 100})`;
                currentIndex = nextIndex;
            }, 16);
        }, 3000);
        return this.root;
    }

    mount(parent) {
        parent.appendChild(this.render());
    }
}

let picture = ['picture/xiaoxin_5.jpg',
    'picture/xiaoxin_6.jpg',
    'picture/xiaoxin_7.jpg',
    'picture/xiaoxin_8.jpg']
let div = <Carousel src={picture} />;

div.mount(document.body)