
var isRunning = false;
var anim = 0;
var anim_name = {0:"run", 1:"courir", 2:"rouler", 3:"bailler", 4:"fun"};

var sprite = new CanvasSprite("./images/chat.png", 0, 0, 2, 4);
var spriteSheep = new CanvasSprite("./images/sheeppoe.png", 0, 0, 16, 8);

function update() {
    animNb();
    correct_canvas();
    sprite.stopAnim();
    spriteSheep.stopAnim();
    startstop();
}

function animNb() {
    var ans = document.getElementById("anims").value;
    console.log(ans)
    switch (ans) {
        case "chat":
            anim = 0;
            sprite.addAnimation("run", [0,1,2,3,4,5,6,7]);
            break;
        case "court":
            anim = 1;
            spriteSheep.addAnimation("courir", [4,5,4,5,4,5]);
            break;
        case "roule":
            anim = 2;
            spriteSheep.addAnimation("rouler",[10,112,113,114,115,116,117,118]);
            break;
        case "baille":
            anim = 3;
            spriteSheep.addAnimation("bailler", [3,37,38,39,38,37]);
            break;
        case "fun":
            anim = 4;
            spriteSheep.addAnimation("fun",[36,35,34,10,11,14,13,42,43,42,44,42,12,9,10,81,90,88,89,90,81,10,34,35,36]);
            break;
        default:
            anim = 0;
            sprite.addAnimation("run", [0,1,2,3,4,5,6,7]);
    }
}

function startstop() {
    console.log(anim);
    if (!isRunning) {
        if (anim == 0){
            sprite.selectAnimation(anim_name[anim]);
            sprite.simpleAnim(100);
        }
        else{
            spriteSheep.selectAnimation(anim_name[anim]);
            spriteSheep.simpleAnim(100);
        }
        isRunning = true;
    }
    else{
        if (anim == 0){
            sprite.selectAnimation(anim_name[anim]);
            sprite.stopAnim()
        }
        else{
            spriteSheep.selectAnimation(anim_name[anim]);
            spriteSheep.stopAnim();
        }
        isRunning = false;
    }
}

function correct_canvas() { 
    if (anim==0){
        document.getElementById("canvanim").setAttribute("width", 512);
        document.getElementById("canvanim").setAttribute("height", 256);
    }
    else {
        document.getElementById("canvanim").setAttribute("width", 265);
        document.getElementById("canvanim").setAttribute("height", 200);
    }
}
