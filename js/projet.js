var isRunning = false;

var sprite = new CanvasSprite("./images/chat.png", 0, 0, 2, 4);

drawCanvasImage(sprite.image, 0, 0);

sprite.addAnimation("test", [0,1,2,3,4,5,6]);


function startstop() {
    if (!isRunning) {
        sprite.selectAnimation("test");
        sprite.simpleAnim(50);
        isRunning = true;
    }
    else{
        sprite.selectAnimation("test");
        sprite.stopAnim();

        // ctx.clearRect(0, 0, cv.width, cv.height);
        isRunning = false;
    }
}