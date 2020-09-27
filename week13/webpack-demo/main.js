import { createElement } from "./framework"
import { Carousel } from "./Carousel"
import { TimeLine, Animation } from "./animation"

let picture = ['picture/xiaoxin_5.jpg',
    'picture/xiaoxin_6.jpg',
    'picture/xiaoxin_7.jpg',
    'picture/xiaoxin_8.jpg']
let div = <Carousel src={picture} />;
div.mount(document.body)

let tl = new TimeLine();
tl.add(new Animation({}, 'a', 0, 100, 0,1000, null));
tl.start();