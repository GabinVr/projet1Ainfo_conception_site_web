var animation_on = false;
//sprite.addAnimation("Animation_3", [3,4,5,4,5,4,5,3,9,10,112,113,114,115,116,117,118,10,9,3,37,38,39,38,37]);

var spriteSheep = new CanvasSprite("./images/sheeppoe.png", 0, 0, 16, 8);
spriteSheep.addAnimation("courir", [4,5,4,5,4,5]);
spriteSheep.addAnimation("rouler",[10,112,113,114,115,116,117,118]);
spriteSheep.addAnimation("bailler", [3,37,38,39,38,37]);
var anim3 = ( (((spriteSheep.animations[0].tiles).concat(spriteSheep.animations[1].tiles)).concat(spriteSheep.animations[0].tiles)).concat(spriteSheep.animations[2].tiles));
spriteSheep.addAnimation("Animation_3", anim3);

function startstop() {
    if (!animation_on) {
        spriteSheep.selectAnimation("Animation_3");
        spriteSheep.simpleAnim(100);
        animation_on = true;
    }
    else{
        spriteSheep.selectAnimation("Animation_3");
        spriteSheep.stopAnim();

        // ctx.clearRect(0, 0, cv.width, cv.height);
        animation_on = false;
    }
}