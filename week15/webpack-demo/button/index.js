import { createElement, Component, STATE, ATTRIBUTES } from "../framework.js"
import { enableGesture } from "../gesture"
export { STATE, ATTRIBUTES } from "../framework.js"



export class Button extends Component {
    constructor() {
        super();
    }
    render() {
        this.childContainer = <span></span>;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }
    appendChild(child) {
        if (!this.childContainer) {
            this.render();
        }
        this.childContainer.appendChild(child);
    }
}