let cv = document.getElementById("canvanim");
let ctx = cv.getContext("2d");

// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL)
{
    var image = new Image();
    image.src = imgURL;
    image.alt = "image";

    return image;
}
// -----------------------------------------------------------------------------------
// Dessine l'image sur le canvas
// imge: graphics source
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
function drawCanvasImage(image,posX,posY)
{
    image.addEventListener('load',imageLoaded,false);
    function imageLoaded(evt) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(image,posX,posY);
    }
}

function drawCanvasTile(image, tx, ty, twidth, theight, posX, posY, width, height)
{
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(image, tx, ty, twidth, theight, posX, posY, width, height);
}



// ===================================================================================
// Definition de l'objet Animation
class Animation {};

// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticallement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, nbXTiles, nbYTiles)
{
    var image = canvasImage(spriteImgURL);
    image.addEventListener("load", () => {
        console.log("img chargée");
    });
    this.image = image;
    this.widthTile = 512;
    this.heightTile = 256;
    this.animations = [];
    this.currentAnimation = [];
    this.currentTile = 0;
    this.x = x;
    this.y = y;
    this.width = image.width;
    this.height = image.height;
    this.nbXTiles = nbXTiles;
    this.nbYTiles = nbYTiles;
    this.loop = false;
}
// -----------------------------------------------------------------------------------
// Ajout d'une animation spécifique
// nameAnim : nom de l'animation
// tiles : tableau d'indices de tile
CanvasSprite.prototype.addAnimation = function(nameAnim, tiles)
{
    var animation = new Animation;
    animation.name = nameAnim;
    animation.tiles = tiles;
    if (this.animations && Array.isArray(this.animations)) {
        this.animations.push(animation);
    }
}
// -----------------------------------------------------------------------------------
// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function(nameAnim)
{
    for (let animation of this.animations) {
        if (animation.name === nameAnim) {
            this.currentAnimation =  animation.tiles;
        }
    }
}
// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function()
{
    /* var tileIndex = -1;
    for (let i = 0; i < (this.currentAnimation).length - 1; i++) {
        if (this.currentAnimation[i] == this.currentTile) {
            tileIndex = i+1;
        }
    }
    if (tileIndex == -1) {
        return false;
    } 

    var tx = (tileIndex+1) * (this.widthTile)%this.width;
    var ty = (((tileIndex+1) / (this.width/this.widthTile)) * this.heightTile)% this.height;
	this.currentTile = tileIndex;*/

    
    var tx = this.widthTile*this.tileX(this.currentAnimation[this.currentTile]);
    var ty = this.heightTile*this.tileY(this.currentAnimation[this.currentTile]);
    this.drawTile(this.currentTile, tx, ty);
    this.currentTile++;
    if (this.currentTile == this.currentAnimation.length && this.loop) {
        this.currentTile = 0;
    }
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function(tileIndex)
{
	return tileIndex % this.nbXTiles;
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function(tileIndex)
{
	return Math.floor(tileIndex / this.nbXTiles);
}
// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function(tileIndex, tx, ty)
{
    drawCanvasTile(this.image, tx, ty, this.widthTile, this.heightTile, this.x, this.y, this.widthTile, this.heightTile);   
};
// ----------------------------------------------------------------------------------
// Animation
CanvasSprite.prototype.simpleAnim = function(tps)
{
    this.loop = true;
    this.timeID = setInterval(() => this.nextTile(),tps);
     
	
}
// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function()
{
	this.loop = false;
    clearInterval(this.timeID)
}
// ----------------------------------------------------------------------------------