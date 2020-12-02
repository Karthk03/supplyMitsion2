var packageIMG,helicopterIMG, helicopterSprite, packageSprite;
var packageBody,ground;
var flag = false;
var background_img;
var part1,part2,part3;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	background_img = loadImage("Sky.png");
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() 
{
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(400, 650, 800,50);
	groundSprite.shapeColor=color("brown");


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 260 , 5 , {restitution:0.3, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(400, 650, 800, 50 , {isStatic:true} );
	World.add(world, ground);
	 
	part1= new Crate(400,600,200,PI/5);
	part2= new Crate(100,500,100,PI);
	part3= new Crate(700,500,100,PI);


	//Engine.run(engine);
  
}


function draw() 
{
  background(background_img);
  Engine.update(engine)
  rectMode(CENTER);

  part1.display();
  part2.display();
  part3.display();

  packageSprite.x= packageBody.position.x; 
  packageSprite.y= packageBody.position.y;

  console.log(packageBody);

  if(keyDown("RIGHT"))
  {
	helicopterSprite.velocityX = +5;
	if(flag == false)
	{
		packageBody.position.x = helicopterSprite.x;
	}
  }
  if(keyWentUp("RIGHT"))
  {
	helicopterSprite.velocityX = 0;
  }
  if(keyDown("LEFT"))
  {
	helicopterSprite.velocityX = -5;
	if(flag == false)
	{
		packageBody.position.x = helicopterSprite.x;
	}
  }
  if(keyWentUp("LEFT"))
  {
	helicopterSprite.velocityX = 0;
  }
  drawSprites();
  keyPressed();
}

function keyPressed() 
{
 if (keyCode === DOWN_ARROW) 
 {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.

	Matter.Body.setStatic(packageBody,false);
	
	flag = true;
  }
}



