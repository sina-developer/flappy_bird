import baseImg from "../../../assets/base.png";
import {global} from "../../canvas_handler/global_vars";

var g = new global();

function Base(ctx , baseHeight , bird)  {
    this.base = new Image();
    var baseLoaded = false;

    this.dx = 0;
    
    this.init = () => {

        
        
        this.base.src = baseImg;
        
        this.base.onload = (e) => {
            baseLoaded = true;      
        }
    }

    this.show = () => {
        if(baseLoaded){
            ctx.drawImage(this.base,this.dx,g.height - baseHeight );            
            ctx.drawImage(this.base, this.dx + this.base.width,g.height - baseHeight );
        }
    }

    this.update = () => {

        if(!bird.isDead){
            this.dx -= 1 * 2;
            if(this.dx <= -this.base.width){
                this.dx = 0;
            }
        }
        this.show();
    }

}

export {Base};