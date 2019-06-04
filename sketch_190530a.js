

let wdth = 600;
let hght = 300;

//monster vars
let mnstrSize = 10;
let mnstrSpeed = 2;
var amount = 100;
var mnstrs = [];
var age = 20;

//brains vars
let amountBrains = 20;
var bras = [];

function setup() {
  // frame rate
  frameRate(30);
  // canvas
  createCanvas(wdth, hght);
  noStroke();

// draw Brains
var indidex = 0;
for (let i = 0; i <= amountBrains; i++){
  bras[indidex++] = new Brains(
    i,
    random(20, width - 20),
    random(20, height -20)
  )
}

// draw monserts
  var index = 0;
  for (let x = 0; x < amount; x++){
    var xPosStart;
    var yPosStart;

    var fortunas = random(0,100);

    if ( fortunas <= 25){
      xPosStart = width - mnstrSize * 2;
      yPosStart = random(0,height);
    }
    else if (fortunas > 25 && fortunas <= 50){
      xPosStart = 0;
      yPosStart = random(0,height);
    }
    else if (fortunas >50 && fortunas <= 75){
      xPosStart = random(0,width);
      yPosStart = height - mnstrSize * 2;
    }
    else{
      xPosStart = random(0,width);
      yPosStart = 0;
    }

    mnstrs[index++] = new Monster(
      x,
      xPosStart,
      yPosStart,
      1,
      1,
      mnstrSpeed,

    );
  }
}

function draw() {

  if(frameCount%30){
    background(42, 50, 130);
    // draw Brains
    for (var i = 0; i < bras.length; i++) {
      bras[i].draw();
    }

    // DRAW MONSTERS
    for (let i = 0; i < amount; i++) {
      if ( mnstrs[i]){
        mnstrs[i].update();
      }
      if ( mnstrs[i]){
        mnstrs[i].draw();
      }

    }
  }
}



/////////////////////// classes
class Brains {
  constructor(id, xOff, yOff){
    this.id = id;
    this.xOff = xOff;
    this.yOff = yOff;

  }
  getEaten(){

  }
  draw(){
    fill(253,153,185);
    ellipse(this.xOff, this.yOff, 5,5)
  }
}

class Monster {
  constructor(id, xOff, yOff, x, y, speed){
    this.id = id;
    this.xOff = xOff;
    this.yOff = yOff;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.lifespan = round(random(100,500));
    this.currentAge = 0;
    this.xDir = 1;
    this.yDir = 1;
    this.direction = 0;
    this.fortune = 0;
    this.transparency = 255;

    this.currentX = 0;
    this.currentY = 0;

  }

  update(){
    //see if monster should change direction
    this.fortune = random(0,100);
    if (this.fortune >=85){
      this.direction = round(random(-0.6,8.4));
    }

    //direction change
    if (this.direction == 0){
      //W
      this.x = this.x + this.speed * this.xDir ;
    }
    else if (this.direction == 1){
      //E
      this.x = this.x - this.speed * this.xDir ;

    }
    else if (this.direction == 2){
      //S
      this.y = this.y + this.speed * this.yDir ;

    }
    else if (this.direction == 3){
      //N
      this.y  = this.y - this.speed * this.yDir ;
    }
    else if (this.direction == 4){
      //NW
      this.y  = this.y - this.speed * this.yDir ;
      this.x = this.x + this.speed * this.xDir ;
    }
    else if (this.direction == 5){
      //SW
      this.y  = this.y + this.speed * this.yDir ;
      this.x = this.x + this.speed * this.xDir ;
    }
    else if (this.direction == 6){
      //SE
      this.y  = this.y + this.speed * this.yDir ;
      this.x = this.x - this.speed * this.xDir ;
    }
    else if (this.direction == 7){
      //NE
      this.y  = this.y - this.speed * this.yDir ;
      this.x = this.x - this.speed * this.xDir ;
    }
    else if (this.direction == 8){
      //Hammer Time
      this.y  = this.y ;
      this.x = this.x ;
      this.currentAge --;
    }
    // see if monster is dead
    this.currentAge ++;
    if (this.currentAge >= this.lifespan){
      delete mnstrs[this.id];
    }
    // change transparency
    this.transparency = map(this.currentAge, 0 , this.lifespan , 255 ,0)


    // update current position
    this.currentX = this.xOff + this.x;
    this.currentY = this.yOff + this.y;
    // bounce from walls
    if (this.currentX <= 0 - 1){
      this.xDir = -this.xDir;
    }
    else if (this.currentX >= width - mnstrSize + 1){
      this.xDir = -this.xDir;
    }

    if (this.currentY <= 0 - 1 ){
      this.yDir = -this.yDir;
    }
    else if (this.currentY >= height - mnstrSize + 1){
          this.yDir = -this.yDir;
    }


  }

  draw(){
    fill(0, 215, 155,this.transparency);
    tint(255, this.transparency);

    ellipse(this.currentX, this.currentY,mnstrSize, mnstrSize)

  }
}
