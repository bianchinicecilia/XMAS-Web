var song;
var button;
var amp;
var canvas;

let angle;
let extraCanvas;

let kitten;
let train;


function preload() {
  kitten = loadImage('kittens/kitten2.jpg');
  train = loadModel('train-corrected.obj');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas (windowWidth, windowHeight);
  canvas.position (0, 0);
  canvas.style('z-index', '-3');
  song = loadSound('yume.mp3', loaded);
  amp = new p5.Amplitude();
  background('#F4EDED');
  extraCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
  extraCanvas.clear();
}

function loaded() {
  button = createButton('play');
  button.mousePressed(togglePlaying);
  button.position(10,10);
  button.style('background-color', '#F4EDED');
  button.style('color:#E21118');
  button.style('font-size', '1.5em');
}

function draw() {
  //sound reaction
  background('#F4EDED');

  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 370, 600);

  fill('#FFFFFF');
  noStroke();
  ellipse(width / 2, height / 2, diam, diam);

  // obj

  extraCanvas.ambientLight(50);
  extraCanvas.directionalLight(255, 255, 255, 0, 0, 1);
  extraCanvas.noStroke();

  extraCanvas.push();

  extraCanvas.rotateZ(frameCount * 0.01);
  extraCanvas.rotateX(frameCount * 0.01);
  extraCanvas.rotateY(frameCount * 0.01);

  // Rotate in direction of mouse
  let posX = width/6;
  let posY = height/6;

  let angle = Math.atan2(mouseY-posY, mouseX-posX);

  // Rotate on MouseDrag
  /*let angle = 0;

  if (mouseIsPressed) {
    angle =  atan2(mouseY - height / 2, mouseX - width / 2);
  }*/

  extraCanvas.rotateX(angle);
  extraCanvas.rotateY(angle);
  extraCanvas.rotateZ(angle);

  //extraCanvas.translate(-100, 0, 0);
  extraCanvas.clear();
  extraCanvas.texture(kitten);
  extraCanvas.model(train);

  //extraCanvas.imageMode(CENTER);
  image(extraCanvas, 0, 0);
  extraCanvas.imageMode(CENTER);


  extraCanvas.pop();

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html('pause');
  } else {
    song.stop();
    button.html('play');
  }
}
