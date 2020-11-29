// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/NCCHQwNAN6Y

var song;
var button;
var amp;
var canvas;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas (windowWidth, windowHeight, WEBGL);
  /*createCanvas(windowWidth, windowHeight,WEBGL);*/
  canvas.position (0, 0);
  canvas.style('z-index', '-3');
  song = loadSound('yume.mp3', loaded);
  amp = new p5.Amplitude();
  background('#F4EDED');
}

function loaded() {
  button = createButton('Play');
  /*button.mousePressed(info);*/
  button.mousePressed(togglePlaying);
  button.position(10,10);
  button.style('background-color', '#F4EDED');
  button.style('color:#E21118');
  button.style('font-size', '1.5em');
}

/*function info() {
  rect(100,100,100,100);
}*/

function draw() {
  background('#F4EDED');

  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 370, 600);

  fill('#FFFFFF');
  noStroke();
  ellipse(0, 0, diam, diam);
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
