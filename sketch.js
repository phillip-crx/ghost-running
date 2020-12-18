var ghost , ghostImage;
var climber, climberImage;
var door,doorImage;
var tower,towerImage;
var doorgroup,climbergroup;
var invisibleblock , invisibleblockgroup;
var gamestate = "play"
var spookywav;

function preload () {
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-jumping.png")
  spookywav = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600,600)
  
  spookywav.loop()
  
  
  tower = createSprite(300,300,20,20)
  tower.addImage(towerImage)
  tower.velocityY = 3
  
  ghost = createSprite(300,300,20,20)
  ghost.addImage(ghostImage)
  ghost.scale = 0.5
  
  
  
  invisibleblockgroup  = new Group()
  doorgroup = new Group()
  climbergroup = new Group()
}

function draw() {
  background(0)
  
  if(gamestate === "play") {
    if(tower.y >= 400) {
    tower.y = 300
    }  
      
      if(keyDown("up_arrow")) {
    ghost.velocityY = -5
  }
  
  ghost.velocityY = ghost.velocityY+0.2
  
  if(keyDown("right_arrow")) {
    ghost.x += 3
  }
  
  if(keyDown("left_arrow")) {
   ghost.x -= 3
  }
  
  if(climbergroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleblockgroup.isTouching(ghost) || ghost.y >= 600) {
    ghost.destroy()
    gamestate = "end"
  }
  
  spawndoors()
     
  drawSprites()
  
 
  }
  else if(gamestate === "end") {
    textSize(30)
    stroke("yellow")
    text("GAME OVER",300,300)
    
  }
}

function spawndoors () {
  if(frameCount % 200 === 0) {
    door = createSprite(200,-50) 
    door.addImage(doorImage)
    
    climber = createSprite(200,10)
    climber.addImage(climberImage)
    
    invisibleblock = createSprite(200,10)
    
    
    door.x = Math.round(random(100,400)) 
    door.velocityY = 3
    
    climber.x = door.x
    climber.velocityY = door.velocityY
    invisibleblock.x = door.x
    invisibleblock.velocityY = door.velocityY
    
    invisibleblock.width = climber.width;
    invisibleblock.height = 2
    
    ghost.depth = door.depth;
    climber.depth = ghost.depth;
    ghost.depth += 1
    
    
    
    door.lifetime = 600
    
    climber.lifetime = 600
    
    climbergroup.add(climber)
    
    doorgroup.add(door)
    
    invisibleblockgroup.add(invisibleblock)
    invisibleblock.debug = true
    
  }
}







