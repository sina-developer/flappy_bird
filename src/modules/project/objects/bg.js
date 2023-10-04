import bg from "../../../assets/bg.png";

function Background(ctx){
    var img0 ;
    var loaded = false;

    this.load = ()=>{
        // console.log(bg);
        
        img0 = new Image();
        // console.log(bird_0);
        
        //drawing of the test image - img1
        img0.onload = function () {
            // ctx.drawImage(img , 0 , 0);
            loaded = true;
        };

        img0.src = bg;
    }

    this.show = () => {
        
        if(loaded){
            ctx.drawImage(img0 , 0 , 0);
            ctx.closePath();
        }
    }

}

export {Background};