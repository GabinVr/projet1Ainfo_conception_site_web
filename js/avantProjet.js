var monimage = new Image();
monimage.src = "./images/paysage.jpg";
monimage.alt = "paysage";
monimage.addEventListener('load', imageLoaded, false);
function imageLoaded(evt) {
    var cv = document.getElementById("canvaimage");
    var ctx = cv.getContext("2d");
    ctx.drawImage(monimage, 0, 0);
}