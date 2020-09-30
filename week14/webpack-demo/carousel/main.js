import { createElement } from "./framework"
import { Carousel } from "./Carousel"

let picture = ['picture/xiaoxin_5.jpg',
    'picture/xiaoxin_6.jpg',
    'picture/xiaoxin_7.jpg',
    'picture/xiaoxin_8.jpg']
let div = <Carousel src={picture} />;
div.mount(document.body)