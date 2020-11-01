//declaring variables for sounds
let bass;
let drums;
let guitar;
let vocals;


//declaring variables for pictures
let paul;
let ringo;
let george;
let john;


//declaring variables for the circular movement
let angle = 0;
let scalar = 400;


//PLAY / STOP BUTTON
let playButton;



function preload(){
//SOUNDS
	bass = loadSound("./assets/sounds/bass.mp3");
  drums = loadSound("./assets/sounds/drums.mp3");
	guitar = loadSound("./assets/sounds/guitar.mp3");
	vocals = loadSound("./assets/sounds/vocals.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);


//Play/stop BUTTON
		  playButton = createButton("START");
		  playButton.position(windowWidth/2, (windowHeight/10)*9);
			playButton.style("background-color", "black")
			playButton.style("cursor", "pointer")
			playButton.style("font-size", "16px")
			playButton.style("font", "Roboto")
			playButton.style("color", "white")
			playButton.style("padding", "8px 20px 8px 20px");
			playButton.style("border-style", "solid");
			playButton.style("border-color", "white");
			playButton.style("border-width", "2px");

			//play/stop FUNCTION
		  playButton.mouseClicked(musicPlayer);



//BEATLES PICS
paul = createImg("./assets/images/paul.png");
paul.mousePressed(toggleBass);
paul.style("cursor", "pointer");

ringo = createImg("./assets/images/ringo.png");
ringo.mousePressed(toggleDrums);
ringo.style("cursor", "pointer");

george = createImg("./assets/images/george.png");
george.mousePressed(toggleGuitar);
george.style("cursor", "pointer");

john = createImg("./assets/images/john.png");
john.mousePressed(toggleVocals);
john.style("cursor", "pointer");



// STARTING VOLUME
bass.amp(0);
drums.amp(0);
guitar.amp(0.5);
vocals.amp(0);


//VOLUME ANALYZER
analyzer1 = new p5.Amplitude();
analyzer1.setInput(bass);

analyzer2 = new p5.Amplitude();
analyzer2.setInput(drums);

analyzer3 = new p5.Amplitude();
analyzer3.setInput(guitar);

analyzer4 = new p5.Amplitude();
analyzer4.setInput(vocals);


//FRAMERATE
frameRate(20);


//ANGLE MODE
angleMode(DEGREES);
}


function draw() {
background("black");

// POSITIONS
let x = windowWidth/2;
let y = windowHeight/3.5;

let x_paul = x + scalar * cos(angle)/2;
let y_paul = y + scalar * sin(angle)/2;

let x_ringo = x + scalar * cos(angle+90)/2;
let y_ringo = y + scalar * sin(angle+90)/2;

let x_george = x + scalar * cos(angle+180)/2;
let y_george = y + scalar * sin(angle+180)/2;

let x_john = x + scalar * cos(angle+270)/2;
let y_john = y + scalar * sin(angle+270)/2;


paul.position(x_paul, y_paul);

ringo.position(x_ringo, y_ringo);

george.position(x_george, y_george);

john.position(x_john, y_john);


//MOVE IN A CIRCLE
angle++;



//VOLUME
let volume1 = analyzer1.getLevel();
let volume2 = analyzer2.getLevel();
let volume3 = analyzer3.getLevel();
let volume4 = analyzer4.getLevel();

//SIZE
if (volume1>0) {
		paul.style("width", "143px")
	} else {
			paul.style("width", "113px")
}

if (volume2>0) {
    ringo.style("width", "131px")
  } else {
			ringo.style("width", "101px")
}

if (volume3>0) {
		george.style("width", "149px")
	} else {
			george.style("width", "119px")
}

if (volume4>0) {
		john.style("width", "136px")
	} else {
			john.style("width", "106px")
}



//TEXT
  let myText = "They need your help \nto come together.";
	let myText2 = "Tap on a Beatle to make him join the jam. \nTap again to make him stop.";

  fill(color("white"));
  textFont('Roboto');
	textAlign(LEFT);

	push()
  textSize(30);
  text(myText, 20, 50);
  pop()

	push()
  textSize(20);
  text(myText2, 20, 150);
  pop()
}



//START / STOP MUSIC
function musicPlayer() {

if (drums.isPlaying() == false && guitar.isPlaying() == false && vocals.isPlaying() == false && bass.isPlaying() == false) {
    drums.play();
    guitar.play();
    vocals.play();
    bass.play();

  } else if (drums.isPlaying() == true && guitar.isPlaying() == true && vocals.isPlaying() == true && bass.isPlaying() == true) {
    drums.pause();
    guitar.pause();
    vocals.pause();
    bass.pause();

	} else if (drums.isPaused() == true && guitar.isPaused() == true && vocals.isPaused() == true && bass.isPaused() == true) {
		drums.play();
    guitar.play();
    vocals.play();
    bass.play();
}
}



//TOGGLE BASS
function toggleBass() {
	let volume1 = analyzer1.getLevel();
  if (volume1>0) {
      bass.setVolume(0);
		} else {
          bass.setVolume(0.5)
					}
    }


//TOGGLE DRUMS
function toggleDrums() {
	let volume2 = analyzer2.getLevel();
  if (volume2>0) {
      drums.setVolume(0);
    } else {
        drums.setVolume(0.5)
}
}


//TOGGLE GUITAR
function toggleGuitar() {
	let volume3 = analyzer3.getLevel();
  if (volume3>0) {
      guitar.setVolume(0);
		} else {
          guitar.setVolume(0.5)
      }
    }


//TOGGLE VOCALS
function toggleVocals() {
	let volume4 = analyzer4.getLevel();
	if (volume4>0) {
		    vocals.setVolume(0)
		} else {
			vocals.setVolume(0.5);
		}
    }



//window resized function
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
