var w;
var points;
function setup() {
  createCanvas(640, 360);
  a = new Walker(255, 100);
  b = new Walker(100, 50);
  c = new Walker(175, 10);
  points = [];
  background(51); // leave trace on the screen
}

function draw() {
  //background(51);
  a.walk();
  a.display();

  b.walk();
  b.display();

  c.walk();
  c.display();
}

function Walker(color,size){
  this.x = width/2;
  this.y = height/2;
  this.col = color;
  this.size = size;
  this.wait = size/3;

  this.display = function(){
    fill (this.col);
    ellipse(this.x, this.y, this.size,this.size);
  }

  this.walk = function(){
    // Make bigger elements slower
    if (this.wait > 0){
      --this.wait;
      return;
    }else{
      this.wait = size/3;
    }
    // check for left and right edge
    var upperX = this.wait,lowerX = -this.wait;
    if (this.x + lowerX < 0){
      lowerX = 0;
    }else if (this.x + upperX > width){
      upperX = 0;
    }
    // check for top and bottom edge
    var upperY = this.wait,lowerY = -this.wait;
    if (this.y + lowerY < 0){
      lowerY = 0;
    }else if (this.y + upperY > height){
      upperY = 0;
    }

    // only go in x or y direction at one time
    if (random() > 0.5){
      this.x += random(lowerX, upperX);
    }else{
      this.y += random(lowerY, upperY);
    }
  }
}