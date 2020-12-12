var song;
var button;
var amp;
var canvas;
var showInfo = false;

let angle;
let extraCanvas;

let kitten;
let train;


function preload() {
  kitten = loadImage('ModelSnowStorm-flip.jpg');
  train = loadModel('SnowStorm_Low.obj');
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
  button = createButton('Play');
  button.mousePressed(togglePlaying);
  button.mouseOver(onMouseOver);
  button.mouseOut(onMouseOut);
  button.position(15,15);
  button.style('background-color', '#F4EDED');
  button.style('color:#E21118');
  button.style('font-size', '1.9em');
  button.style('border', '0');
  button.style('fill', '0');
  button.style('outline', 'none');
}

function draw() {
  //sound reaction
  background('#F4EDED');

  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 360, 500);

  fill('#FFFFFF');
  noStroke();
  ellipse(width / 2, height / 2, diam, diam);
    if(showInfo) {
      let s = 'Yume Miru Kokoro by Riki Miyagawa, \nJapan 1934. \nThis could loop all morning.';
      fill(50);
      text(s, 110, 20, 250, 80); // Text wraps within text box
    }

  // obj

  extraCanvas.ambientLight(30);
  extraCanvas.directionalLight(255, 255, 255, 0, 80, 15);
  extraCanvas.directionalLight(255, 255, 255, 0, -180, 5);
  extraCanvas.directionalLight(86, 54, 2, 0, 0, 1);
  extraCanvas.noStroke();

  extraCanvas.push();

  extraCanvas.rotateZ(frameCount * 0.003);
  extraCanvas.rotateX(frameCount * 0.005);
  extraCanvas.rotateY(frameCount * 0.003);

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

  imageMode(CENTER)
  image(extraCanvas, width / 2, height / 2);
  //image(extraCanvas, 0, 0);
  //extraCanvas.imageMode(CENTER);


  extraCanvas.pop();

}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html('Pause');
  } else {
    song.stop();
    button.html('Play');
  }
}

function onMouseOver() {
  showInfo = true;
}
function onMouseOut(){
  showInfo = false;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
