export function createElement(type, attrbutes, ...children) {
    let elem;
    if (typeof type === "string") {
        elem = new ElementWrapper(type);
    } else {
        elem = new type();
    }
    for (let attr in attrbutes) {
        elem.setAttribute(attr, attrbutes[attr]);
    }
    for (let child of children) {
        if (typeof child === "string") {
            child = new TextWrapper(child);
        }
        elem.appendChild(child);
    }
    return elem;
}

export class Component {
    constructor(type) {
    }
    setAttribute(attr, value) {
        this.root.setAttribute(attr, value)
    }

    appendChild(child) {
        child.mount(this.root);
    }

    mount(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super();
    }
    render() {
       return document.createTextNode(content);
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super();
    }
    render() {
        return document.createElement(type);
    }
}