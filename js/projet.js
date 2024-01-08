var isRunning = false;

var sprite = new CanvasSprite("./images/chat.png", 0, 0, 2, 4);

drawCanvasImage(sprite.image, 0, 0);

sprite.addAnimation("run", [0,1,2,3,4,5,6]);
sprite.addAnimation("courir", [4,5,4,5,4,5]);
sprite.addAnimation("rouler",[10,112,113,114,115,116,117,118]);
sprite.addAnimation("bailler", [3,37,38,39,38,37]);
sprite.addAnimation("fun",[36,35,34,10,11,14,13,42,43,42,44,42,12,9,10,81,90,88,89,90,81,10,34,35,36]);

function startstop() {
    if (!isRunning) {
        sprite.selectAnimation("run");
        sprite.simpleAnim(50);
        isRunning = true;
    }
    else{
        sprite.selectAnimation("run");
        sprite.stopAnim();

        // ctx.clearRect(0, 0, cv.width, cv.height);
        isRunning = false;
    }
}