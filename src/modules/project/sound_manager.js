import {global} from "../canvas_handler/global_vars";
import die_sound from "../../assets/sounds/die.ogg";
import hit_sound from "../../assets/sounds/hit.ogg";
import point_sound from "../../assets/sounds/point.ogg";
import swoosh_sound from "../../assets/sounds/swoosh.ogg";
import wing_sound from "../../assets/sounds/wing.ogg";

function SoundManager () {
    this.player ;
    

    this.play = (mode) => {        

        switch (mode){
            case "wing":
                this.player = new Audio(wing_sound);
            break;
            case "hit":
                this.player = new Audio(hit_sound);
            break;
            case "point":
                this.player = new Audio(point_sound);
            break;
            case "swoosh":
                this.player = new Audio(swoosh_sound);
            break;
            case "die":
                this.player = new Audio(die_sound);
            break;
        }


        this.player.play();
    }
}

export {SoundManager};