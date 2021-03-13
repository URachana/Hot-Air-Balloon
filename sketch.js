var bgImg;
var balloon,balloonImg;
var database;
function preload(){
  bgImg= loadImage("bg1.jpg");
  balloonImg = loadImage("hotairballoon.png");

}
function setup() {
  createCanvas(1200,400);

  database = firebase.database();
  balloon = createSprite(50, 300, 50, 50);
  balloon.addImage("object",balloonImg);
  balloon.scale = 0.28;

  var balloonPos = database.ref('balloon/position');
  balloonPos.on("value",readPosition, showMsg);

}

function draw() {
  background(bgImg);
  drawSprites();
  textSize(20);
  fill("white");
  
  text("Use Arrow keys to move",10,30);
 
  if(keyDown(UP_ARROW)){
    changePosition(0,-3);
    balloon.scale= balloon.scale - 0.002;
  }
  if(keyDown(DOWN_ARROW)){
    changePosition(0,3);
    balloon.scale= balloon.scale + 0.002;
  }
  if(keyDown(RIGHT_ARROW)){
    changePosition(3,0);
  }
  if(keyDown(LEFT_ARROW)){
    changePosition(-3,0);
  }

  
}

function changePosition(x,y){

  database.ref('balloon/position').set({
    x : position.x + x,
    y: position.y + y
  })
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}
function showMsg(){
  console.log("Error in writing to the database");
  
}