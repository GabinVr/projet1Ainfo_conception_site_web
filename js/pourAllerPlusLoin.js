function canvasImage(imgURL)
{
    var image = new Image();
    image.src = imgURL;
    image.alt = "image";

    return image;
}

function seq2cycle(sequence, widthTile, heightTile, nbXTiles, nbYTiles, duration){
    var cyc = [];

    for (let i = 0; i<sequence.length; i++){
        var xOff = tileX(sequence[i], nbXTiles)*widthTile;
        var yOff = tileY(sequence[i], nbXTiles, nbYTiles)*heightTile;
        cyc.push([xOff, yOff, duration]);
    }
    return cyc;
}

function tileX(index, nbXTiles){
    return index % nbXTiles;
}

function tileY(index, nbXTiles, nbYTiles){
    return Math.floor(index/nbXTiles) % nbYTiles;
}

var cv = document.getElementById("canvanim");
var ctx = cv.getContext("2d");

var courir = [4,5,4,5,4,5];
var rouler = [10,112,113,114,115,116,117,118];
var bailler = [3,37,38,39,38,37];
var concat = [3,4,5,4,5,4,5,3,9,10,112,113,114,115,116,117,118,10,9,3,37,38,39,38,37]

var carousel = { 0: courir, 1: rouler, 2: bailler, 3: concat};

exist = false;
isRunning = false;

function startstop() {

    if (!isRunning) {
        isRunning = true;
        if (!exist){
            animate("./images/sheeppoe.png", carousel[0], "canvanim", 16, 8, 10);
            animate("./images/sheeppoe.png", carousel[1], "canvanim1", 16, 8, 10);
            animate("./images/sheeppoe.png", carousel[2], "canvanim2", 16, 8, 10);
            animate("./images/sheeppoe.png", carousel[3], "canvanim3", 16, 8, 10);
            exist = true;
        }
    }
    else{
        isRunning = false;
    }
}


function animate(imgUrl, sequence, canvaname, nbXTiles, nbYTiles, tps, scale=5){
    var cv = document.getElementById(canvaname);
    // Si le canvas n'existe pas, on le crée
    if (cv == null){
        var cv = document.createElement("canvas");
        cv.id = canvaname;
        cv.width = 200;
        cv.height = 200;
        document.body.appendChild(cv);
    }

    var scene = sjs.Scene({w:cv.width, h:cv.height, autoPause: false});

scene.loadImages([imgUrl], function() {
    var canvas = scene.Layer(canvaname, {useCanvas:true});
    var widthTile = Math.floor(cv.width / scale );
    var heightTile = Math.floor(cv.height / scale );


    var mouton = scene.Cycle(seq2cycle(sequence, widthTile, heightTile, nbXTiles, nbYTiles, tps));
    var sprite = scene.Sprite(imgUrl);
    // sprite.move(720, 400); // 3
    // sprite.move(1000, 520); // 4
    sprite.move(1280, 640); // 5
    sprite.scale(scale);
    mouton.addSprite(sprite);

    var paused = false;
    function paint() {
        var start = new Date().getTime(),
            xv = Math.sin(ticker.currentTick / 15) * 2,
            xscale = xv < 0 ? 1 : -1;
        if (isRunning){
            mouton.next(ticker.lastTicksElapsed);
            sprite.update();
        }
    };
    var ticker = scene.Ticker(tps, paint);
    ticker.resume();
});
}