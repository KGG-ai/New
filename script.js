const scanMessage = 
`Scanning user...

Identity confirmed.

Name: Grizzly

Status: Komu's most important person ❤️`;

let index = 0;

function typeScan(){

const element = document.getElementById("scanText");

if(index < scanMessage.length){

element.innerHTML += scanMessage.charAt(index);
index++;

setTimeout(typeScan,50);

}else{

/* hide scan screen */

setTimeout(()=>{

document.getElementById("systemScan").style.display="none";

/* start ayanokoji intro */

let intro = document.getElementById("ayanokojiIntro");

intro.style.display = "flex";

/* hide intro after animation */

setTimeout(()=>{

intro.style.display="none";

/* start background music */

let music = document.getElementById("bgMusic");

music.volume = 0.6;

music.play().catch(()=>{});

},6000);
},2000);

}

}

window.onload = function(){

typeScan();

};

let heartMode = false;


/* ===============================
PAGE CHANGE WITH GLASS EFFECT
================================*/

function nextPage(num){

let flash = document.getElementById("flashReveal");

flash.style.animation = "flashReveal 0.4s ease";

setTimeout(()=>{
flash.style.animation = "";
},400);

setTimeout(()=>{

/* hide all pages */

let pages = document.querySelectorAll(".page");

pages.forEach(page=>{
page.classList.add("hidden");
});

/* show selected page */

let target = document.getElementById("page"+num);

if(target){
target.classList.remove("hidden");
}

/* stop voice notes */

let voices = [
document.getElementById("fortodayyyy"),
document.getElementById("angryVoice"),
document.getElementById("sadVoice"),
document.getElementById("lonelyVoice"),
document.getElementById("emptyVoice")
];

voices.forEach(v=>{
if(v){
v.pause();
v.currentTime = 0;
}
});

/* FINAL PAGE EFFECT */

if(num === 5){

heartMode = true;

let ghoul = document.getElementById("ghoulAwakening");
let eye = document.querySelector(".ghoulEye");
let ring = document.querySelector(".kaguneRing");
let para = document.getElementById("loveMessage");
let heart = document.getElementById("heartbeatSound");

/* show black screen */

ghoul.style.opacity = 1;

/* play heartbeat */

heart.volume = 0.7;
heart.currentTime = 0;
heart.play().catch(()=>{});

/* restart animations */

eye.style.animation = "none";
ring.style.animation = "none";

void eye.offsetWidth;   // force animation restart
void ring.offsetWidth;

eye.style.animation = "eyeGlow 1.4s ease forwards";
ring.style.animation = "kaguneExpand 1.6s ease forwards";

/* hide ghoul screen */

setTimeout(()=>{

ghoul.style.opacity = 0;

para.style.opacity = 1;

},1700);

/* paragraph fade */

setTimeout(()=>{

para.classList.add("fadeOut");

},6500);

/* final message */

setTimeout(()=>{

document.getElementById("finalWish").classList.add("show");

},8500);

}

},300);

}
/* ===============================
MESSAGE BUTTONS
================================*/

function playVoice(type){

let voices = {
fortodayyyy: document.getElementById("fortodayyyy"),
angry: document.getElementById("angryVoice"),
sad: document.getElementById("sadVoice"),
lonely: document.getElementById("lonelyVoice"),
empty: document.getElementById("emptyVoice")
};

let bgMusic = document.getElementById("bgMusic");

/* stop other voices */

Object.values(voices).forEach(v=>{
if(v){
v.pause();
v.currentTime=0;
}
});

/* lower background music */

if(bgMusic){
bgMusic.volume = 0.15;
}

let selected = voices[type];

if(selected){

selected.volume = 1;
selected.play().catch(()=>{});

/* when voice ends restore music */

selected.onended = function(){

if(bgMusic){

let fade = setInterval(()=>{

if(bgMusic.volume < 0.6){
bgMusic.volume += 0.02;
}else{
clearInterval(fade);
}

},200);

}

};

}

}
function showFinalWish(){

let text=document.getElementById("loveMessage")

/* paragraph visible for few seconds */

setTimeout(()=>{

text.classList.add("fadeOut")

},60000)

/* show final message after fade */

setTimeout(()=>{

document.getElementById("finalWish").classList.add("show")

},65000)

}
/* ===============================
ANIME PARTICLES
================================*/

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

function resizeCanvas(){

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",()=>{
resizeCanvas();
init();
});

let particles=[];
let mouse={x:null,y:null};

window.addEventListener("mousemove",function(event){

mouse.x=event.x;
mouse.y=event.y;

});

/* ===============================
PARTICLE CLASS
================================*/

class Particle{

constructor(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

const isMobile = window.innerWidth < 600;

this.size = isMobile ? Math.random()*2 + 1.5 : Math.random()*3 + 1;

this.speedX = Math.random()*0.6-0.3;
this.speedY = Math.random()*0.6-0.3;

this.opacity = Math.random();
this.twinkleSpeed = Math.random()*0.02 + 0.005;

}

update(){

this.x+=this.speedX;
this.y+=this.speedY;

/* mouse repel */

let dx=mouse.x-this.x;
let dy=mouse.y-this.y;

let distance=Math.sqrt(dx*dx+dy*dy);

if(distance<120){

this.x-=dx/20;
this.y-=dy/20;

}

/* star twinkle */

this.opacity += this.twinkleSpeed;

if(this.opacity >= 1 || this.opacity <= 0){
this.twinkleSpeed *= -1;
}

/* heart float on final page */

if(heartMode){
this.y -= 0.2;
}

}

draw(){

ctx.globalAlpha=this.opacity;

if(heartMode){

/* draw heart */

ctx.fillStyle="#ff4d6d";

ctx.beginPath();

ctx.moveTo(this.x,this.y);

ctx.bezierCurveTo(
this.x-5,this.y-5,
this.x-10,this.y+5,
this.x,this.y+10
);

ctx.bezierCurveTo(
this.x+10,this.y+5,
this.x+5,this.y-5,
this.x,this.y
);

ctx.fill();

}else{

/* normal star */

ctx.fillStyle="white";

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();

}

ctx.globalAlpha=1;

}

}

/* ===============================
INIT PARTICLES
================================*/

function init(){

particles=[];

let particleCount = window.innerWidth < 600 ? 80 : 140;

for(let i=0;i<particleCount;i++){
particles.push(new Particle());
}

}

/* ===============================
ANIMATION LOOP
================================*/

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<particles.length;i++){

particles[i].update();
particles[i].draw();

}

requestAnimationFrame(animate);

}

init();
animate();
/* ===============================
MEMORY IMAGE VIEWER
================================*/

const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImg");
const closeViewer = document.getElementById("closeViewer");

/* open image */

document.querySelectorAll(".carousel img").forEach(img => {

    img.addEventListener("click", () => {

        viewerImg.src = img.src;
        viewer.classList.add("show");

    });

});

/* close viewer */

if(closeViewer){
closeViewer.addEventListener("click", () => {

    viewer.classList.remove("show");

});
}

/* also close if background clicked */

viewer.addEventListener("click", (e) => {

    if(e.target === viewer){
        viewer.classList.remove("show");
    }

});