import { enableGesture } from "./index.js"

//自定义事件
document.documentElement.addEventListener("pan", () => {
    console.log("pan click trigger")
})
enableGesture(document.documentElement);
