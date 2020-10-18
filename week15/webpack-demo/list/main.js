import { createElement } from "../framework"
import { List } from "./index"

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

let button = <List data={picture}>
    {
        record =>
            <div>
                <img src={record.img} />
                <a href={record.url}>{record.title}</a>
            </div>
    }
</List>

button.mountTo(document.body);