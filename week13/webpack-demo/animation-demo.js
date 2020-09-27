import { TimeLine, Animation } from "./animation.js"

let tl = new TimeLine();
tl.add(new Animation(document.querySelector("#el").style, 'transform', 0, 1000, 0, 2000, v => v, v => `translateX(${v}px)`));

document.querySelector("#start-btn").addEventListener("click", () => tl.start())
document.querySelector("#pause-btn").addEventListener("click", () => tl.pause())
document.querySelector("#resume-btn").addEventListener("click", () => tl.resume())
document.querySelector("#reset-btn").addEventListener("click", () => tl.reset())