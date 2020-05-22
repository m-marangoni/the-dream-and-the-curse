var circleArray = [];
var angle = 0;
var d1 = 50;
var words = ['hello', 'people', 'of', 'the', 'earth'];

var sourceText = "They were young. Utopian dreams of decentralization gurgled inside their heads, certain that they were at the right place, at the right time. Doing God’s work. Shaping the future. But that is not how things go, right? Reality has variables that surpasses the comprehension of the brightest minds and cutting-edge machines. Making everyone a fool. END";
var words2 = sourceText.split(" ");


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

}


function draw() {
  background(0);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].move();
    circleArray[i].make(i);
  }


  if (circleArray.length > 1) {
    connectDots();
  }
}

function mousePressed() {
  var circleInst = new Circle(mouseX, mouseY);
    circleInst.make();
  circleArray.push(circleInst);
 
}

function connectDots() {

  for (let i = 0; i < circleArray.length; i++) {
    strokeWeight(random(1, 3));
    stroke(80, 150);
    if (i > 0) {
      line(circleArray[i].anchor.x, circleArray[i].anchor.y, circleArray[i - 1].anchor.x, circleArray[i - 1].anchor.y);
    }
  }
  line(circleArray[circleArray.length - 1].anchor.x, circleArray[circleArray.length - 1].anchor.y, circleArray[0].anchor.x, circleArray[0].anchor.y);

}

function Circle(x, y) {
  this.xPos = x;
  this.yPos = y;
  this.size = d1;
  this.angle = angle;
  this.anchor = createVector(0, 0);

  this.move = function() {
    this.size = (sin(this.angle) + d1);
    this.angle += 0.01;
  }


  colorRandom = random(80, 255);


  this.make = function(n) {
    noFill();
    noStroke();
    push();
    translate(this.xPos, this.yPos);
    rotate(this.angle);
    ellipse(0, 0, this.size, this.size);
    pop();
    this.anchor = createVector((cos(this.angle) * this.size / 6) + this.xPos, (sin(this.angle) * this.size / 6) + this.yPos);
    // textAlign(CENTER);
    fill(random(200, 255));
    let index = n % words2.length;
        ellipse(this.anchor.x, this.anchor.y, 5);

    //  fill(colorRandom);
    // text(words[index], this.anchor.x, this.anchor.y + 30);
    //for (var n = 0; n < words.length; n++) {
    textFont('DM Mono');
    text(words2[index], this.anchor.x, this.anchor.y + 30);
    //}
    if(index >= 55){
      fill(255);
      link = createA("parttwo.html", 
                       "go to part 2", "_self"); 
      link.position(windowWidth - 300,windowHeight - 100) 
      noLoop();}
      
  }
}