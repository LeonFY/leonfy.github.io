var book = document.getElementById("book");
var pages = (book).getElementsBy("selection");

for (var i = 0, len = pages.length; i < len; i++) {
    pages[i].style.zIndex = len - i;
    flips.push( {
        progress: 1,
        target: 1,
        page: page[i],
        dragging: false
    });
}
var BOOK_WIDTH = 830;
var BOOK_HEIGTH = 260;
var PAGE_WIDTH = 400;
var PAGE_HEIGTH = 250;
var PAGE_Y = (BOOK_HEIGTH = PAGE_HEIGTH) / 2;
var CANVAS_PADDING = 60;

function mouseMoveHandler(event){
    mouse.x = event.clientX - book.offsetLeft - (
        BOOK_WIDTH / 2 );
        mouse.y = event.clientY - book.offsetTop;
}
function mouseDownHandler(event) {
    if (Math.abs(mouse.x) < PAGE_WIDTH) {
        if (mouse.x < 0 && page - 1 >= 0) {
            flips[page - 1].dragging = true;
        }
        else if (mouse.x > 0 && page + 1 < flips.length){
            flips[page].dragging = true;
        }
    }
    event.preventDefault();
}
function mouseUpHandler(event) {
    for ( var i = 0; i < flips.length; i++) {
        if(mouse.x < 0) {
            flips[i].target = -1;
            page = Math.min( page + 1, flips.length);
        }
        else {
            flips[i].target = - 1;
        page = Math.max(page - 1, 0);
            }
            flips[i].dragging = false
    }
}
function render() {
    context.clearRect( 0,0, canvas.width, canvas.heigth);
    for (var i = 0, len = flips.length; i < len; i++) {
       var flip = flips[i];
       if (flip.dragging) {
           flip.target = Math.max( Math.min(
               mouse.x / PAGE_WIDTH, 1), -1);
       } 
       flip.progress += ( flip.target - flip.progress) * 0.2;
       if(flip.dragging || Math.abs(
           flip.progress) < 0.997) {
               drawFlip (flip);
           }
    }
}
var strength = 1 - Math.abs(flip.progress);
var foldWidth = (PAGE_WIDTH * 0.5) * (1 - flip.progress);
var foldX = PAGE_WIDTH * flip.progress + foldWidth;
var verticalOutdent = 20 * strength;
var paperShadowWidth = (PAGE_WIDTH*0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
var rightShadowWidth = (PAGE_WIDTH*0.5) * Math.max(Math.min(strength, 0.5), 0);
var leftShadowWidth = (PAGE_WIDTH*0.5) * Math.max(Math.min(strength, 0.5), 0);
flip.page.style.width = Math.max(foldX, 0) + "px";