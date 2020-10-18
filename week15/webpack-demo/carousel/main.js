import { createElement } from "../framework"
import { Carousel } from "./Carousel"

let picture = [
    {
        img: 'picture/xiaoxin_5.jpg',
        url: "https://time.geekbang.org",
        title: "小葵"
    },
    {
        img: 'picture/xiaoxin_6.jpg',
        url: "https://time.geekbang.org",
        title: "阿呆"
    },
    {
        img: 'picture/xiaoxin_7.jpg',
        url: "https://time.geekbang.org",
        title: "风间"
    },
    {
        img: 'picture/xiaoxin_8.jpg',
        url: "https://time.geekbang.org",
        title: "广志"
    }
]
let div = <Carousel src={picture}
    onClick={event => window.location.href = event.detail.data.url}
    onChange={event => console.log(event.detail.position)} />
div.mountTo(document.body)