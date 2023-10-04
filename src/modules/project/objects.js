import {Bird} from "./objects/bird";
import {Background} from "./objects/bg";
import {Base} from "./objects/base";
import {Pipe} from "./objects/pipe";

class Objects {
    constructor(){
        this.bird  = Bird;
        this.BackGround = Background;
        this.Base = Base;
        this.Pipe = Pipe;
    }
}

export {Objects};