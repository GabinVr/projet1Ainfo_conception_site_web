// ===================================================================================
// canvasImage : image sur un canvas
// nameImg : URL de l'image
// (posX,posY) : position du coin supérieur gauche de l'image dans le canvas
// ctx : contexte graphique
function canvasImage(imgURL,posX,posY,ctx)
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

}

function drawCanvasTile(image, posX, posY, width, height, tx, ty, twitdh, theight)
{
    image.addEventListener('load', imageLoaded, false);
    function imageLoaded(evt) {
        var cv = document.getElementById("canvaimage");
        var ctx = cv.getContext("2d");
        ctx.drawImage(image, posX, posY, width, height, tx, ty, twitdh, theight);
    }
}


// ===================================================================================
// Definition de l'objet CanvasSprite
let CanvasSprite = {
    animations : [],
    currentAnimation : [],
    currentTile : 0,
    loop : false,
}
// ===================================================================================
// Definition de l'objet Animation
let Animation = {}

// ===================================================================================
// Constructeur for an animation object
// image: graphics source
// (x, y): position to draw the animation
// width, height: size of each tile
// nbXTiles : nombre de tiles horizontalement
// nbYTiles : nombre de tiles verticallement
// loop : animation en boucle (true) ou non (false)
function CanvasSprite(spriteImgURL, x, y, widthTile, heightTile, nbXTiles, nbYTiles, ctx)
{
    this.image = canvasImage(spriteImgURL);
    this.x = x;
    this.y = y;
    this.width = widthTile;
    this.height = heightTile;
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
    animation = new Animation;
    animation.name = nameAnim;
    animation.tiles = tiles;
    if (this.animations && Array.isArray(this.animations)) {
        this.animations.push(animation);
    }
    
}
// -----------------------------------------------------------------------------------
// Sélectionne une animation spécifique nameAnim
CanvasSprite.prototype.selectAnimation = function(nameAnim,loop)
{
    for (let animation of this.animations) {
        if (animation.name === nameAnim) {
            this.currentAnimation =  [animation];
        }
    }
}
// -----------------------------------------------------------------------------------
// Sélectionne la tile suivante et la dessine, si la tile existe (mode sans boucle)
// retourne false si la tile courrante est la dernière (mode sans boucle), true sinon
CanvasSprite.prototype.nextTile = function()
{
    var tileIndex = -1;
    for (let i = 0; i < this.currentAnimation(0).tiles.length - 1; i++) {
        if (tile[i] === this.currentTile) {
            tileIndex = i+1;
        }
    }
    if (tileIndex == -1) {
        return false;
    }

    var tx = (tileIndex+1) * (this.widthTile)%this.width;
    var ty = (((tileIndex+1) / (this.width/this.widthTile)) * this.heightTile)% this.height;
	this.currentTile = tileIndex;
    this.drawTile(tileIndex, tx, ty);
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon x
CanvasSprite.prototype.tileX = function(tileIndex)
{
	return this.width*(tileIndex+1);
}
// -----------------------------------------------------------------------------------
// Retourne la position de la tile dans le sprite selon y
CanvasSprite.prototype.tileY = function(tileIndex)
{
	return this.height*(tileIndex+1);
}
// -----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.drawTile = function(tileIndex, tx, ty)
{
    drawCanvasTile(this.image, this.tileX, this.tileY, tx, ty, this.widthTile, this.heightTile);   
};
// ----------------------------------------------------------------------------------
// Dessine une tile
CanvasSprite.prototype.simpleAnim = function(tps)
{
    
	while (this.loop) {
        this.nextTile

    }
}
// ----------------------------------------------------------------------------------
CanvasSprite.prototype.stopAnim = function()
{
	
}
// ----------------------------------------------------------------------------------