

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
  extraCanvas.rotateZ(frameCount * 0.00005);
  extraCanvas.rotateX(frameCount * 0.00005);
  extraCanvas.rotateY(frameCount * 0.00005);
  extraCanvas.clear();
  extraCanvas.translate(0, 0, 0);
  extraCanvas.texture(kitten);
  extraCanvas.model(train);
  extraCanvas.noStroke();

  image(extraCanvas, 0, 0);

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
