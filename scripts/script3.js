var circleArray = [];
var angle = 0;
var d1 = 50;
var words = ['hello', 'people', 'of', 'the', 'earth'];

var sourceText = "There is a saying, by Einstein - some insist, that states that the act of insisting on the thing expecting a different result is a definition of insanity. But isn’t that the way most of our science was created? Trial and error. You may have to be a bit insane to obsess and insist on your ideals, even if the world mocks you, or worst, just keeps on going. But vindication will come. But vindication will come. But vindication will come. ";
var words2 = sourceText.split(" ");

let y = 0;
let speed = 0.05;
let gravity = 0.02;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //noLoop();
  //frameRate(0);
}

function draw() {
  background(0);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].move();
    circleArray[i].make(i);
  }
}



function mousePressed() {
  var circleInst = new Circle(mouseX, mouseY);
  circleInst.make();
  circleArray.push(circleInst);
}

function Circle(x, y) {
  this.move = function() {
    this.size = (sin(this.angle) + d1);
    this.angle += 0.01;
  }
  colorRandom = random(80, 255);

  this.make = function(n) {
    fill(random(200, 255));
    let index = n % words2.length;
    textFont('DM Mono');
    textAlign(CENTER);
    textSize(12);
    let rumble = 0
    let rumbleY = 0
    let positionY
    positionY = (windowHeight - (20 + (13 * index)) + rumbleY);
    if (index > 10 && index < 20) {
      rumble = random(0, 5);
      rumbleY = random(1);
    } else if (index >= 20 && index < 73) {
      rumble = random(0, 5);
      rumbleY = random(3);
    } else if (index >= 73) {
      positionY = y
      y = y + speed;
      speed = speed + gravity;
      
    } else {
      rumble = 0;
    }

    text(words2[index], (windowWidth / 2 + rumble), positionY);
    if(index >= 80){
      fill(255);
      link = createA("partthree.html", 
                       "go to part 3", "_self"); 
      link.position(windowWidth - 300,windowHeight - 100) 
      noLoop();}
  }
}

 