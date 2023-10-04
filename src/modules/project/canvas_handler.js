import {global} from "../canvas_handler/global_vars";
import {Objects} from "./objects";
import {UIManager} from "./ui_manager";
import {SoundManager} from "./sound_manager";




var mainCtx ;
var g = new global();
var objects = new Objects();
let UI ;

var currentStat = g.stats[0];

g.mousePressed = (e)=>{ 
    jump();
}

g.keyPressed = (e)=>{
    if(e.keyCode == 32){        
        jump();
    }
    
}

function jump (){
    if(noJump){
        return;
    }
    soundManager.play("wing");
    if(bird.isDead){
        currentStat = g.stats[0];
        start(mainCtx);
    }else{
        if(currentStat == g.stats[0]){
            currentStat = g.stats[1];
        }
        bird.jump(); 
    }
}

let bird ;
let bg ;
let base ;
let baseHeight = 100;
let score = 0;

let soundManager ;

let pipes = [];

let noJump = false;

var start = (ctx)=>{
    soundManager = new SoundManager();
    soundManager.play("swoosh");
    mainCtx = ctx;
    score = 0;
    UI = new UIManager(ctx);
    UI.init();
    bird = new objects.bird(
            ctx ,
            g.width / 3 ,
            g.height / 1.7  , 
            0 , 0, 
            g.height - baseHeight , 
            25,"#2196F3" , 
            (hasFall)=>{
                currentStat = g.stats[2];
                if(hasFall){
                    soundManager.play("die");
                }
                soundManager.play("hit");
                noJump  = true;
                setTimeout(() => {
                    noJump = false;
                }, 1000);
            }
        );
    bird.load();
    
    
    pipes = [];
    
    for (let i = 0; i < 2; i++) {
        var pipe = new objects.Pipe(
                    ctx,
                    g.width * (1 + (0.6 * (i + 1))), 
                    bird , 
                    () => {
                        score++;
                        soundManager.play("point");
                    }
                );
        pipe.load();
        pipes.push(pipe);
    }
    bg = new objects.BackGround(ctx);
    bg.load();
    base = new objects.Base(ctx , baseHeight , bird);
    base.init();
}

var update = (ctx) => {
    bg.show();
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];                    
        pipe.update();
    }
    bird.update();//get out!
    base.update();
    // console.log(currentStat);
    
    UI.show(currentStat , score);
}

export {start , update};