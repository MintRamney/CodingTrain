var walkers;

function setup() 
{
  createCanvas(640, 360);
  walkers = new Array(5);
  for (var i=0; i < walkers.length; ++i){
    walkers[i] = new Walker(random(100,255),random(10,100))
  }
}

function draw() 
{
  background(51); 
  for (w of walkers){
    w.update();
    w.display();
  }
}

function Walker(color,size)
{
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0,0);
  this.col = color;
  this.size = size;
  // array of position vectors for tail
  this.trace = new Array(50);
  for (var j = 0; j < this.trace.length; ++j){
    this.trace[j] = new p5.Vector(width+this.size, height+this.size);
  }
  // current index in trace list
  this.i = 0;
  
  this.display = function()
  {
    fill (this.col);
    // effectively make array a circle
    if (this.i < this.trace.length-1){
      this.i++;
    }else{
      this.i = 0;
    }

    this.trace[this.i] = this.pos.copy();
    
    // display trail oldest->newest
    var j = this.i;
    do {
      j++;
      if (j >= this.trace.length){
        j = 0;
      }
      ellipse(this.trace[j].x, this.trace[j].y, this.size,this.size);
    } while (j != this.i);

  }

  this.update = function()
  {
    var mouse = createVector(mouseX,mouseY);
    this.acc = p5.Vector.sub(mouse,this.pos);
    this.acc.normalize();
    this.acc.mult(25/this.size); // big means slow
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //check for screen edges
    if (this.pos.x > width || this.pos.x <0){
      this.vel.x = 0;
    }
    if (this.pos.y > height || this.pos.y <0){
      this.vel.y = 0;
    }
  }

}