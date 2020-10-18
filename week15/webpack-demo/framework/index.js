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
    let processChildren = (children) => {
        for (let child of children) {
            if (typeof child === "object" && child instanceof Array) {
                processChildren(child);
                continue;
            }
            if (typeof child === "string") {
                child = new TextWrapper(child);
            }
            elem.appendChild(child);
        }
    }
    processChildren(children);
    return elem;
}

export const STATE = Symbol('state');
export const ATTRIBUTES = Symbol("attributes");
export class Component {
    constructor(type) {
        this[STATE] = Object.create(null);
        this[ATTRIBUTES] = Object.create(null);
    }
    setAttribute(attr, value) {
        this[ATTRIBUTES][attr] = value;
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root);
    }
    triggerEvent(type, args) {
        this[ATTRIBUTES]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: args }));
    }
    render() {
        return this.root;
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super();
        this.root = document.createTextNode(content);
    }

}

class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type);
    }
    setAttribute(attr, value) {
        this.root[attr] = value;
    }
}