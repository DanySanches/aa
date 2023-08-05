var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  //atividade 1 - Definir o tamanho do canvas com base na largura e altura da janela:
  createCanvas(windowWidth, windowHeight);
  
  //atividade 2 alterar a posiçao do  trex para que  ele  fique  centralizado na  tela
  trex = createSprite(width/8,height-70,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  // atividade 3 alterar a posição do  solo para que  ele  fique  centralizado na  tela
  ground = createSprite(width/2,height-10,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  // atividade  4 alterar a posição do gameOver para que  ele  fique  centralizado na  tela
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  // atividade  5 alterar a posição restart para que  ele  fique  centralizado na  tela
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  // atividade  6 alterar a posição do invisibleGround para que ele fique no final da tela:
  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  //  atividade 7 Ajustar o tamanho e a posição da pontuação para que ela fique sempre visível independentemente do tamanho da tela:
  text("Pontuação: "+ score, width-150,50);
   
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    // ativdade 8- deixar o  touches, para  permitir q o rex  pule pelo  toque
    if(( touches.length > 0 || keyDown("space")) && trex.y >= 159) {
      trex.velocityY = -12;
      touches = [];
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
 
  if (frameCount % 60 === 0) {
    // atividade 9 Ajustar a posição das nuvens para que eles não fiquem fora da tela:
    var cloud = createSprite(width , random(80,120), 40,10);
    // cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
   
    cloud.lifetime = width / cloud.velocityX; // Ajustar o tempo de vida da nuvem

    

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
   
  // atividade 10 ajustar a posição obstáculos para que eles não fiquem fora da tela: 
    var obstacle = createSprite(width,height-30,width,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);   
    
    //gere um obstáculo aleatório
    var rand = Math.round(random(1,6));   
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2); 
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}
