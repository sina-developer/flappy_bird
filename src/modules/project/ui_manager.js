import {global} from "../canvas_handler/global_vars";
import startImage from "../../assets/start.png";
import gameOverImage from "../../assets/gameover.png";
import playImage from "../../assets/play.png";
import scoreImage from "../../assets/score.png"
import newImage from "../../assets/new_tag.png";
import num0 from "../../assets/nums/0.png";
import num1 from "../../assets/nums/1.png";
import num2 from "../../assets/nums/2.png";
import num3 from "../../assets/nums/3.png";
import num4 from "../../assets/nums/4.png";
import num5 from "../../assets/nums/5.png";
import num6 from "../../assets/nums/6.png";
import num7 from "../../assets/nums/7.png";
import num8 from "../../assets/nums/8.png";
import num9 from "../../assets/nums/9.png";


var numsImages = [
    num0,
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9
];


var maxScore = 0;


var showNewTag = false;
var g = new global();

function UIManager (ctx){
    
    this.start = new Image();
    var startLoaded = false;

    this.gameOver = new Image();
    var gameOverLoaded = false;

    this.scorePanel = new Image();
    var scorePanelLoaded = false;

    this.newTag = new Image();
    var newTagLoaded = false;

    this.play = new Image();
    var playLoaded = false;
    var playTop = 0;
    var playMaxY = g.height - g.height / 2.5;
    var playSpeed = 10;

    
    var loadedNums = 0;
    this.nums = [];

    for (let i = 0; i < 10; i++) {
        this.nums.push(new Image());
    }

    this.init = () => {
        this.start.src = startImage;
        this.start.onload = () => {
            startLoaded = true;
        }
        
        this.gameOver.src = gameOverImage;
        this.gameOver.onload = () => {         
            gameOverLoaded = true;
        }

        this.play.src = playImage;
        this.play.onload = () => {         
            playLoaded = true;
        }

        this.newTag.src = newImage;
        this.newTag.onload = () => {         
            newTagLoaded = true;
        }

        this.scorePanel.src = scoreImage;
        this.scorePanel.onload = () => {         
            scorePanelLoaded = true;
        }

        for (let i = 0; i < this.nums.length; i++) {
            const num = this.nums[i];
            num.src = numsImages[i];
            num.onload = () => {
                loadedNums++;
            }
        }
    }


    this.show = (stat , score = 0)=>{
        switch (stat){
            case g.stats[0]:
                playTop = 0;
                playSpeed = 10;
                showNewTag = false;
                this.showStart();
            break;
            case g.stats[1]:
                this.showScore(score);
            break;
            case g.stats[2]:
                this.showGameOver(score);
            break;
            case g.stats[3]:
                this.showPlay();
            break;
        }
    }

    this.showStart = () => {
        if(startLoaded){
            ctx.drawImage(this.start , g.width / 2 - this.start.width / 2 , g.height / 2 - this.start.height / 2);
        }
    }

    this.showGameOver = (score) => {
        
        if(gameOverLoaded){
            ctx.drawImage(this.gameOver , g.width / 2 - this.gameOver.width / 2 , g.height / 4);
        }
        this.showScorePanel(score);
        this.showPlay();
    }

    this.showScore = (score) => {        
        // score = 13;
        score += "";
        let scores = score.split("");
        let test = this.nums[0];
        let scoreWidth = 0;
        let top = 40;
        for (let i = 0; i < scores.length; i++) {
            const score = parseInt(scores[i]);
            let num = this.nums[score];
            scoreWidth += num.width;
        }

        ctx.translate(g.width / 2 - scoreWidth /2 , top);


        let width = 0;
        for (let i = 0; i < scores.length; i++) {
            const score = parseInt(scores[i]);
            let num = this.nums[score];
            ctx.drawImage(num , width , 0);
            width = num.width;
        }
                
        ctx.translate(-(g.width / 2 - scoreWidth /2), -top  );
        
    }

    this.showPlay = () => {
        if(playLoaded && playTop == playMaxY){
            
            ctx.imageSmoothingEnabled= false
            ctx.drawImage(this.play , g.width / 2 - g.width / 5 , g.height * 3 / 4.2, g.width / 2.5 , g.width / 2.5 * this.play.height / this.play.width);
            ctx.imageSmoothingEnabled= true

        }
    }

    this.showScorePanel = (score) => {

        if(maxScore != score){
            if(maxScore < score){
                showNewTag = true;
            }
        }
        console.log("=>"+(maxScore < score));
        

        
        maxScore = Math.max(score + 0 , maxScore);

        if(scorePanelLoaded){
            if(playMaxY > playTop){
                playTop += 1 * playSpeed;
                playSpeed -= playSpeed * 0.03 ;
            }else{                
                playTop = playMaxY;
            }
            var newWidth = g.width * 0.9;
            var newHeight = newWidth * this.scorePanel.height / this.scorePanel.width;
            var top = g.height -  playTop ;
            ctx.imageSmoothingEnabled= false;
            ctx.drawImage(this.scorePanel , g.width / 2 - newWidth / 2 , top , newWidth , newHeight);
            
            this.showNumber(score , (g.width - newWidth ) / 2 + newWidth - 25 , top + 40);
            this.showNumber(maxScore , (g.width - newWidth ) / 2 + newWidth - 25 , top + 85);
            
            if(showNewTag && newTagLoaded){
                var tagWidth = this.newTag.width * 2;
                var tagHeight = this.newTag.height * 2;
                ctx.drawImage(this.newTag , (g.width - newWidth ) / 2 + newWidth - 100 , top + 68 ,tagWidth , tagHeight);
            }
            ctx.imageSmoothingEnabled= true;
        }
    }

    this.showNumber = (number , x , y) =>{
        // console.log(number);
        
        number += "";
        let scores = number.split("");
        let test = this.nums[0];
        let scoreWidth = 0;
        let top = 40;
        
        for (let i = 0; i < scores.length; i++) {
            const score = parseInt(scores[i]);
            let num = this.nums[score];
            scoreWidth += num.width * 0.6;
        }

        ctx.translate(x - scoreWidth , y);


        let width = 0;
        for (let i = 0; i < scores.length; i++) {
            const score = parseInt(scores[i]);
            let num = this.nums[score];
            ctx.drawImage(num , width , 0 , num.width * 0.6 , num.height * 0.6);
            width = num.width;
        }
        
        ctx.translate(-(x - scoreWidth) , -y);
    }
}

export {UIManager};