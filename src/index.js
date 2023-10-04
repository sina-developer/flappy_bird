import _ from 'lodash';
import './styles.css';
import {canvas} from "./modules/canvas";


let component = () => {
    let element = document.createElement("div")
    element.classList.add("cover");
    return element;
}
  
document.body.appendChild(canvas());
document.body.appendChild(component());