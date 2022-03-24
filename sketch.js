var windowWidth
var windowHeight
var trex ,trex_running;
var ground,groundImage;
var piso;
var cloud,cloudImage;
var obstacle1
var obstacle2
var obstacle3
var ob
var grupostacle4
var obstacle5
var obstacle6
var group
var PLAY = 1
var END = 0
var gameState = PLAY;
var score = 0
var trexcollide
var gameOverIma
var GameOver
var salto
var sonidoperder
var puntajE
var windowWidth
var windowHeight
var fondo,fondoImage
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("nubes.png");
  fondoImage = loadImage("fondoTrex.jpg");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexcollide = loadAnimation("trex_collided.png")
  gameOverIma = loadImage ("restart.jpg")
  GameOver = loadImage("gameOver.png")
  salto = loadSound ("mario-bros-jump.mp3")
  sonidoperder = loadSound("perder.mp3")
  puntajE = loadSound("whistle-campana-whatsapp.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //Crea el sprite del Trex
  trex = createSprite(100,height-4,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5
  trex.setCollider("circle",0,0,40)
  trex.debug = true
  perder = createSprite(width-350,100)
  perder.addImage("gameover",GameOver)
  perder.scale = 1
  
  
  errar = createSprite(width-350,height-250)
  errar.addImage("gameOver",gameOverIma)
  errar.scale = 0.12
  
  
  ground = createSprite (200,height-30,400,20)
  ground.addImage("ground",groundImage)
  ground.x = ground.width/2
  
  piso = createSprite(width/2,height+80,width,200);
  piso.visible=false
  
  group = new Group();
  grupo = new Group();
  
  var mensaje = "nice"
 console.log(mensaje) 
  
  score = 0
  fondo()
}

function draw(){
  background(180)
   
  
  text("score:"+score,500,50)
  console.log("this is",gameState)
    trex.collide(piso)
  
  if (gameState === PLAY){
  ground.velocityX = -4
  score = score + Math.round (frameCount/65);
  if(score>0&&score%500 ===0){
    puntajE.play;
    
  }
  perder.visible = false
  errar.visible = false 
    
  if(ground.x<= 0){
    ground.x = ground.width/2
  }
  
  if(keyDown("space")){
    
    salto.play();
    trex.velocityY = -9
  }  
    
    trex.velocityY = trex.velocityY +0.65
    
    if(grupo.isTouching(trex)){
      
     
      sonidoperder.play;
      gameState = END;
      

    } 
    
    
  
  spawnobstacles();
  spawnclouds();
    
  }
   else if(gameState === END){ 
   
   trex.changeAnimation("colision",trexcollide)
   ground.velocityX = 0  
   grupo.setVelocityXEach(0)
   group.setVelocityXEach(0)
   grupo.setLifetimeEach(-1)
   group.setLifetimeEach(-1)
   trex.velocity = 0
   perder.visible = true
   errar.visible = true
   
      
      
    }
   
  
if(mousePressedOver(errar)){
    
      reinicio();
  
    } 
  drawSprites();

}
 
  function spawnclouds(){
    if (frameCount %80 === 0){
      cloud = createSprite(200,100,20,20);
      cloud.addImage("cloud",cloudImage)  
      cloud.scale = 0.07
      cloud.velocityX = -0.8
      cloud.y = Math.round(random(20,500))  
        cloud.lifetime = 100
      cloud.depth = trex.depth
      trex.depth = trex.depth +1
     group.add(cloud)
         
    }
     if (frameCount %80 === 0){
      cloud = createSprite(300,200,20,20);
      cloud.addImage("cloud",cloudImage)
       cloud.scale = 0.07
      cloud.velocityX = -0.8
      cloud.y = Math.round(random(20,150))  
        cloud.lifetime = 100
      cloud.depth = trex.depth
       cloud.depth = errar.depth
      trex.depth = trex.depth +1
       errar.depth = errar.depth +1
     group.add(cloud)
         
    }
    } 
 
function spawnobstacles(){
  if(frameCount% 70 ===0){
    
   var obstacle = createSprite(550,height-38,15,40)
   obstacle.velocityX = -5
    obstacle.lifetime = 130
    obstacle.scale = 0.5
    
    var rand =Math.round(random(1,6))
    switch(rand){
      
      
     case 1:  obstacle.addImage(obstacle1)
           break;
   
    case 2: obstacle.addImage(obstacle2)
           break;
     case 3:obstacle.addImage(obstacle3)
           break;
     case 4: obstacle.addImage(obstacle4)
           break;
     case 5: obstacle.addImage(obstacle5)
           break;
           case 6: obstacle.addImage(obstacle6)
        break;
  }
  grupo.add(obstacle)
  
  }
}

  function fondo(){
    
   fondo = createSprite(width-450,height-220,50,50)
    fondo.addImage("fondoI",fondoImage)
    fondo.depth = fondo.depth = -2
    
    
    
    
  }

function reinicio(){
  
  gameState = PLAY
  
  errar.visible = false
  perder.visible = false
  trex.changeAnimation("correr",trex_running)
  grupo.detroyEach(0)
  group.destroyEach(0)
  score = 0
       



}
                    