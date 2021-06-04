var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
score=0;
function preload(){
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  bg = loadImage("jungle.jpg")
  bananaimg = loadImage("banana.png")
  stoneimg = loadImage("stone.png")
  groundimg = loadImage("ground.jpg")
  marioo=loadSound("mario.mp3")
  go=loadSound("go.wav")
}

function setup() {
  createCanvas(700, 400);
  monkey=createSprite(100,240)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.15
  bananag = new Group();
  obstacleg = new Group();
  ground=createSprite(350,520)
  ground.addImage("moving",groundimg)
  ground.scale=13
  
}

function draw() {
  background(bg);
 
   if(gameState === PLAY){     
     ground.velocityX=-4;
     if(ground.x<0)
    {ground.x=ground.width/2;}
  if(keyWentDown("space")) {
   marioo.play();
    monkey.velocityY = -10;
  }
  if (bananag.isTouching(monkey)){
    score=score+1;
    bananag.destroyEach();
  }
 stroke("white")
  textSize(20);
  fill("white")
  text("score="+score,500,50)
     text("Reach to Maximum Score you can",350,20)
     text("THE MORE BANANAS YOU EAT, THE MORE BIGGER WILL BE MONKEY",10,70)
 textsize=20;   
 text("PRESSS SPACE BAR TO JUMP",10,20)
     
     switch(score){
       case 5: monkey.scale=0.16;
         break;
         case 10:monkey.scale=0.18;
         break;
         case 15:monkey.scale=0.20;
         break;
         case 20:monkey.scale=0.22;
         break;
         default :break;
     } 
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  spawnbananas();
  spawnobstacles();
     if (obstacleg.isTouching(monkey)){
    monkey.scale=0.15;
       go.play();
       gameState=END;
     }
   }
  else if(gameState === END) {
    ground.velocityX=0;
    stroke("white")
  textSize(20);
  fill("white")
  text("Press R To restart" ,350,200)
    monkey.velocityY = 0;
    score=0;
    bananag.setVelocityXEach(0);
    obstacleg.setVelocityXEach(0);
    if(keyWentDown("R")) {
    gameState=PLAY;
      score=0;
      bananag.destroyEach();
      obstacleg.destroyEach();
      
  }
  }
  drawSprites();
}
function spawnbananas() {
  if (frameCount % 110 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 444;
    bananag.add(banana);
    
  }
  
}
function spawnobstacles() {
  if (frameCount % 120 === 0) {
    var stone = createSprite(600,280,40,10);
    stone.addImage(stoneimg);
    stone.scale = 0.1;
    stone.velocityX = -4;
    
     //assign lifetime to the variable
    stone.lifetime = 444;
    obstacleg.add(stone);
  }
  }