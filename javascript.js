window.onload = () => {
	let totalFrameCount = 0;
  let intervalId = null;

console.log('window load');

document.querySelector(".start-button").onclick = () => {
console.log('button clicked')








  startGame();
  minTimer();
};

function startGame() {
  const myCanvas = document.getElementById('gameCanvas');
  const ctx = myCanvas.getContext('2d'); 
  const background = new Image();
  background.src = "./background3.png";
  const stepmom = new Image();
  stepmom.src = "./silhouette_wip.png";
  const millstone = new Image();
  millstone.src ="./millstone_done.png";

class MovingObjects {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

  draw(){
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
left() {
  return this.x;
}
right() {
  return this.x + this.width;
}

top() {
  return this.y;
}

bottom() {
  return this.y + this.height;
}

  crashWith(target) {
    return !(this.bottom() < target.top() ||this.right() < target.left() || this.left > target.right());
  }

}

class ImageObject extends MovingObjects {
    constructor(x, y, width, height, imageElement) {
        super(x,y, width, height);
        this.image = imageElement;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

let stepX = 400;
let stepY = 500;
let millX = 375;
let millY = 50;

const myBackground = new ImageObject(0, 0, myCanvas.width, myCanvas.height, background);
const myStepmom = new ImageObject(stepX, stepY, 50, 100, stepmom);
const myMillstone = new ImageObject(millX, millY, 50, 50, millstone);

var x=5;
var velocity = 10;

//where to put this function???
function stepmomMove(){


  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
  x = x + velocity;
  if ((x+50)>myCanvas.width || x<0){
    velocity *=-1;
  }

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  myBackground.draw();
  myMillstone.draw();
  }

function updateGame() {
  totalFrameCount++;
console.log('loop')
ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
myBackground.draw();
myStepmom.draw();
myMillstone.draw();

// if(myMillstone.crashWith(myStepmom)){
//   clearInterval(intervalId);
//   alert('The father and little Marleen heard the sound and ran out, but only saw mist and flame and fire. When these had passed, there stood the little brother ...')

}

background.onload = () => {
  intervalId = setInterval(updateGame, 16.67);
}



 

document.addEventListener('keydown', (event) => {


  function fallingStone() {
    if(myMillstone.y < 600) {
      myMillstone.y += 20;
    }
    else if(myMillstone.y == 530) {
      myMillstone.y == 530
    }}


  switch(event.code){
    case 'Space':
      //works but too fast and bounces back???
      //add option to respawn millstone in 3 secons???  if miss
      
      let intervalId = setInterval(fallingStone, 500);
      
      break;
  }
})


// myStepmom.draw();

}
};



let remainingTime = 60;
let place = document.querySelector(".countdown");


function minTimer() {

  console.log(`${remainingTime}`)

    remainingTime -= 1;
    place.innerHTML = `${remainingTime}`;    
if(remainingTime < 10) {
place.style.color ="red";
}


  if(remainingTime == 0 ){
    //document.querySelector(".countdown").innerHTML = "0";
    clearInterval(cancel);
  }
}

let cancel = setInterval(minTimer, 1000);