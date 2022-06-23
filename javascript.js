
window.onload = () => {
  let totalFrameCount = 0;
  let randomFrame = Math.random() * 120 + 60;
  let startingFrame = totalFrameCount;
  let intervalId = null;
  let totalSeconds = 30;
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
        this.vY = 5;
        this.vX = 15;
        this.image = imageElement;
        this.falling = false;
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
        if (
          this.x < target.x + target.width &&
          this.x + this.width > target.x &&
          this.y < target.y + 35 + target.height &&
          this.height + this.y > target.y + 35
        ) {
          // collision detected!
          console.log("Collision detected");
          return true;
        } else {
          return false;
        }
      }

      //
      updatePositionFall() {
        if (this.falling) {
          this.y += this.vY;
          if (this.y >= 526) {
            this.y = 50;
            this.falling = false;
          }
        }
      }

      updateStepmom() {
        //works still but no change in velocity
        let RandomSpeed = Math.random() * 1;
        this.x += this.vX;
        if (this.x + 50 > 800 || this.x < 25) {
          this.vX *= -1;
        }
        //         if (totalFrameCount > startingFrame + randomFrame) {
        //           randomFrame = Math.random() * 120 + 60;
        //           startingFrame = totalFrameCount;}
        //           if (stepmom.vX > 0) {
        //   stepmom.vX = RandomSpeed;
        // }
        // else {stepmom.vX = RandomSpeed * -1;
        // }
      }

      resetMillstone() {
        //not resetting millstone
        myMillstone.y = 50;
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
      myMillstone.updatePositionFall();
      myStepmom.updateStepmom();

      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      myBackground.draw();
      myStepmom.draw();
      myMillstone.draw();

      if (myMillstone.crashWith(myStepmom)) {
        clearInterval(intervalId);
        var screamSound = new Audio("./scream11.wav");
        screamSound.loop = false;
        screamSound.volume = 0.8;
        screamSound.play();
        endPopup();
      } 
    }

    background.onload = () => {
      intervalId = setInterval(updateGame, 16.67);
    };

    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.code) {
        case "Space":
          myMillstone.falling = true;
          console.log("space pressed");

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



function endPopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");  
  typewriter();

  //get boy pic to appear


  setTimeout(function(){
    document.getElementById("boyPicture").removeAttribute("hidden");
},17000);
}




var aText = new Array(
  "The father and little Marlinchen",
        "heard the sound but saw only mist and fire.",
          "When these had passed,", 
        "there stood the little brother...",
          "and all three rejoiced." 
  );
  var iSpeed = 100; // time delay of print out
  var iIndex = 0; // start printing array at this posision
  var iArrLength = aText[0].length; // the length of the text array
  var iScrollAt = 20; // start scrolling up at this many lines
   
  var iTextPos = 0; // initialise text position
  var sContents = ''; // initialise contents variable
  var iRow; // initialise current row
   
  function typewriter()
  {
    console.log('typewriter activates')
   sContents =  ' ';
   iRow = Math.max(0, iIndex-iScrollAt);
   var destination = document.getElementById("typewritertext");
   
   while ( iRow < iIndex ) {
    sContents += aText[iRow++] + '<br />';
   }
   destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
   if ( iTextPos++ == iArrLength ) {
    iTextPos = 0;
    iIndex++;
    if ( iIndex != aText.length ) {
     iArrLength = aText[iIndex].length;
     setTimeout("typewriter()", 500);
    }
   } else {
    setTimeout("typewriter()", iSpeed);
   }
  }
  

  


  //slideshow

  let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 10000); // Change image every 2 seconds
}