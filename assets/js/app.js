let container=document.getElementById('conteiner')
let spin = document.getElementById('spin')
let ground=document.getElementById('ground')
let img = document.querySelectorAll('#spin>img')
////masahat onpointerdown////
let sX,
    sY,
    //////
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;
let num = 240
function init (){
    for(let i =     0 ; i<img.length ; i++){
        img[i].style.transform=`rotateY(${(i*(360/img.length))}deg) translateZ(${num}px)`
        img[i].style.transition=" transform 1s"
        img[i].style.transitionDelay=(img.length-i)/4+'s'
    }
}

document.onwheel=function(e){
 let d=  e.deltaY/4
 num+=d
 init()
}



document.onpointerdown = function(e) {
    clearInterval(container.timer);
    sX = e.clientX;
    sY = e.clientY;
    this.onpointermove = function(e) {
        nX = e.clientX;
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(container);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        container.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(container);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(container.timer);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};
function applyTransform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

setTimeout(init, 1000)
