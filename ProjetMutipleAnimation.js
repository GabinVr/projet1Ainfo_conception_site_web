var animation_on = false;

var sprite = new CanvasSprite("./images/sheeppoe.png", 0, 0, 16, 8);

drawCanvasImage(sprite.image, 0, 0);


//sprite.addAnimation("Animations_3", [3,4,5,4,5,4,5,3,9,10,112,113,114,115,116,117,118,10,9,3,37,38,39,38,37]);

//function startstop() {
    if (!animation_on {
        sprite.selectAnimation("Animations_3");
        sprite.simpleAnim(50);
        animation_on = true;
    }
    else{
        sprite.selectAnimation("Animations_3");
        sprite.stopAnim();

        // ctx.clearRect(0, 0, cv.width, cv.height);
        animation_on = false;
    }
//}