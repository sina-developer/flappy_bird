import {global} from "../../canvas_handler/global_vars";
import {map} from "../../canvas_handler/methods";
import bird_0 from "../../../assets/redbird_0.png";
import bird_1 from "../../../assets/redbird_1.png";
import bird_2 from "../../../assets/redbird_2.png";

let g = new global();

function Bird(ctx , x , y , dy ,minY , maxY, r ,color , deadEvent = null) {
    
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dy = dy;
    this.gap = 60;
    this.ty = this.y - this.gap;
    this.oy = 0;
    this.start = false;
    this.isDead = false;

    // this.loaded = false;    
    var img1 ,img2 , img3;
    this.bird = img1;

    var frames = [];
    var frame = 0;
    var maxSkipFrame = 12;
    var skipFrame = 0;

    var deg = 0;

    var ySin = 0;

    var flashCount = 0;
    var maxFlashCount = 5;


    this.load = function (){
        
        if(!frames[0]){
            img1 = new Image();
            img1.onload = function () {
                frames[0] = img1;
            };
    
            img1.src = bird_0;
        }
         
        if(!frames[2]){
            img2 = new Image();
            img2.onload = function () {
                frames[1] = img2;
            };
    
            img2.src = bird_1;
        }
         
        if(!frames[2]){
            img3 = new Image();
            img3.onload = function () {
                frames[2] = img3;
            };
    
            img3.src = bird_2;
        }
    }

    this.show = function(){
        this.bird = img1;
        this.load();
        
        if(frames.length == 3){
            if(skipFrame  == maxSkipFrame){    
                if(!this.isDead){
                    frame++;
                }
                if(frame >= frames.length){
                    frame = 0;
                }
                
                skipFrame = 0;
            }else{
                skipFrame++;
            }
            
            // deg = 90 * (this.y - this.oy) / (maxY - this.oy);

            // console.log();
            if(this.start){
                // deg = map( this.y , this.oy , maxY , -20 , 90 ,true);
                deg += 2;
                if(deg > 90){
                    deg = 90;
                }
            }else{
                deg = 0;
            }

            
            
            ctx.translate(this.x , this.y);
            ctx.rotate(deg * Math.PI / 180);
            // console.log(deg * Math.PI / 180);            
            ctx.drawImage(frames[frame],-frames[frame].width / 2 , -frames[frame].height / 2);
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-this.x , -this.y);
            // ctx.closePath();
        }    
        this.flash();
    }

    this.update = function(){    

        if(this.start){
            if(this.y + this.r > maxY){
                // this.dy = -this.dy;
                this.dy = 0;
                this.Die(false);
                this.y = maxY;
                        
            }else if (this.y - this.r < this.ty){            
                // this.dy = -this.dy;
                this.y = this.r + this.ty;
                this.dy = 0;
            }else{
                this.dy += 2;
            }
            this.y += this.dy * 0.2;
        }else{
            this.y += Math.sin( ySin * Math.PI / 180) * 1;
            ySin+=10;
        }

        this.show();
    }

    this.jump = function (){
        if(!this.isDead){
            frame = 0;
            deg = -45;
            this.start = true;
            this.oy = this.y;
            this.ty = this.y - (this.gap * 2);   
            this.dy = -this.gap /2; 
        }            
    }

    this.Die = (hasFall = false)=>{
        if(!this.isDead){      
            if(deadEvent!= null){
                deadEvent(hasFall);
            }
            this.isDead = true;
        }
    }

    this.flash = () => {
        if(this.isDead){
            flashCount++;
            if(flashCount < maxFlashCount){
                ctx.fillStyle = "#fffa";
                ctx.fillRect(0,0,g.width , g.height);
                ctx.fill();
            }
        }
    }

}

export {Bird};