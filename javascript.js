//to do: 1. fix crashwith; 2. reset stepmom and stone if not crash; 3. scream sound effect;

window.onload = () => {
  let totalFrameCount = 0;
  let randomFrame = Math.random() * 120 + 60;
  let startingFrame = totalFrameCount;
  let intervalId = null;
  let totalSeconds = 60;
  let place = document.querySelector(".countdown");

  console.log("window load");

  document.querySelector(".start-button").onclick = () => {
    console.log("button clicked");
    startGame();
  };

  function startGame() {
    const myCanvas = document.getElementById("gameCanvas");
    const ctx = myCanvas.getContext("2d");
    const background = new Image();
    background.src = "./background3.png";
    const stepmom = new Image();
    stepmom.src = "./silhouette_wip.png";
    const millstone = new Image();
    millstone.src = "./millstone_done.png";
    let crowCaw = new sound("crow1.mp3");
    crowCaw.play();

    var backgroundMusic = new Audio("./background muZAK.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4;
    backgroundMusic.play();

    class ImageObject {
      constructor(x, y, width, height, imageElement) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vY = 15;
        this.vX = 10;
        this.image = imageElement;
        
      }

      draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        return !(this.bottom() > (target.top() - 35) &&
       ( this.right() < target.left() || this.left() > target.right())
        );
      }

      //
      updatePositionFall() {
        if (this.y <= 475) {
          this.y += this.vY;
        } else if (this.y >= 476) {
          this.y = 50;
        }
      }

     

      updateStepmom() {

        //works still but no change in velocity
        let RandomSpeed = (Math.random()* 1);
        this.x += this.vX;
        if (this.x + 50 > 800 || this.x < 25) {
          this.vX *= -1;
          
        }
        if (totalFrameCount > startingFrame + randomFrame) {
          randomFrame = Math.random() * 120 + 60;
          startingFrame = totalFrameCount;}
          if (stepmom.vX > 0) {
  stepmom.vX = RandomSpeed;
}
else {stepmom.vX = RandomSpeed * -1;
}

      }


    resetMillstone() {

      //not resetting millstone 
      myMillstone.draw();
    }  
    }
    
    let stepX = 400;
    let stepY = 500;
    let millX = 375;
    let millY = 50;

    const myBackground = new ImageObject(
      0,
      0,
      myCanvas.width,
      myCanvas.height,
      background
    );
    const myStepmom = new ImageObject(stepX, stepY, 50, 100, stepmom);
    const myMillstone = new ImageObject(millX, millY, 50, 50, millstone);

    function minTimer() {
      let remainingTime = totalSeconds - Math.floor(totalFrameCount / 60);

      console.log(`${remainingTime}`);

      place.textContent = `${remainingTime}`;
      if (remainingTime < 10) {
        place.style.color = "red";
      }

      if (remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }

    function updateGame() {
      
      totalFrameCount++;
      minTimer();

     

      if (totalFrameCount > startingFrame + randomFrame) {
        randomFrame = Math.random() * 120 + 60;
        startingFrame = totalFrameCount;
        let k = Math.round(Math.random());
        // let RandomSpeed = (Math.random()* 1);

// if (stepmom.vX > 0) {
//   stepmom.vX = RandomSpeed;
// }
// else {stepmom.vX = RandomSpeed * -1;

// }
        if (k == 1) {
          myStepmom.vX *= -1;
        }
      }

      myStepmom.updateStepmom();

      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      myBackground.draw();
      myStepmom.draw();
      myMillstone.draw();

      
    }

    background.onload = () => {
      intervalId = setInterval(updateGame, 16.67);
    };

    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.code) {
        case "Space":
          myMillstone.updatePositionFall();
          console.log("space pressed");

          
      if (myStepmom.crashWith(myMillstone)) {
        let momScream = new sound("scream11.wav");
        momScream.play();
        alert(
          "The father and little Marlinchen heard the sound but saw only mist and fire. When these had passed, there stood the little brother... and all three rejoiced."
        );
        clearInterval(intervalId);
      }
      else if (myMillstone.y == 475)
{
myMillstone.resetMillstone();
     }

          break;
        //case to reload stone
      }
    })

    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      switch (event.code) {
        case "Space":
          ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
          myBackground.draw();
          myStepmom.draw();
          myMillstone.draw();
          console.log("space released");
          break;
      }
    });
  }
};

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = "./crow1.mp3";
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
