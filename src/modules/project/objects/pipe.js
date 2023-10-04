import pipeImage from "../../../assets/pipe.png";
import {global} from "../../canvas_handler/global_vars";
import {Random} from "../../canvas_handler/methods";
var g = new global();


function Pipe(ctx ,x , bird , addScore = null){
    this.pipe = new Image();
    var loaded = false;
    this.x = x;
    this.pos = 0;

    this.scoreGiven = false;
    
    this.setPos = () => {        
        this.pos = Random(g.baseHeight / 2  , g.height - g.baseHeight * 2 );
    }

    this.load = () => {

        this.setPos();
        
        this.pipe.src = pipeImage;

        this.pipe.onload = () => {
            loaded = true;
        }
        
    }


    this.show = () => {

        if(!bird.bird){
            return;   
        }
        if(loaded){
            var ox = this.x;
            var oy = this.pos;
            ctx.drawImage(this.pipe , ox, oy + g.pipeSpace / 2);
            ctx.translate( ox + this.pipe.width, oy);
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(this.pipe , 0, g.pipeSpace / 2);
            ctx.rotate(-180 * Math.PI / 180);
            ctx.translate(-(ox + this.pipe.width) , -oy);
            
            // console.log(bird.bird);
            
            var x1 = bird.x - bird.bird.width / 2;
            var x2 = bird.x + bird.bird.width / 2;

            var y1 = bird.y - bird.bird.height / 2;
            var y2 = bird.y + bird.bird.height / 2;


            // var birdX1 = bird.x;
            // var birdX2 = bird.x + bird.bird.width;

            // var birdY = bird.y + bird.bird.height / 2;
            // if(birdX1 > x && birdX2 < x + this.pipe.width){
            //     if (!(birdY > (this.pos - g.pipeSpace / 2) && birdY < (this.pos + g.pipeSpace / 2))){
            //         bird.isDead = true;
            //     }
            // }

            if(x2 > ox && x1 < ox + this.pipe.width){
                if(!(y1 > (this.pos - g.pipeSpace / 2) && y2 < (this.pos + g.pipeSpace / 2 ))){
                    bird.Die(true);
                }
            }

            if(x1 > ox + this.pipe.width && !this.scoreGiven){
                this.scoreGiven = true;
                if(addScore != null){
                    addScore();
                }
            }
            // if()

            // ctx.fillRect(x , this.pos - g.pipeSpace / 2 , this.pipe.width ,  g.pipeSpace );
            // ctx.fill();
        }


    }

    this.update = () => {
        if(this.x + this.pipe.width < 0){
            this.x = g.width;
            this.setPos(); 
            this.scoreGiven = false;
        }
        if(!bird.isDead && bird.start){
            this.x -= 1 * 2;
        }
        this.show();            
    }

}


export {Pipe};

