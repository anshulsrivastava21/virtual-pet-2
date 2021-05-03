//Create variables here
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()
{
  //load images here
  sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
 // m=loadImage("images/Milk.png");
  //b=loadImage("images/empty.jpeg");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  feed.mouseReleased(stopFeedingDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  //milk=createSprite(760,235,150,150);
  //milk.scale=0.050;
}

function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

//fill(255,255,254);
//text("press the button to feed your dog noddy", 400, 30, 500, 100);
//textSize(15);

  drawSprites();
}
  function stopFeedingDog(){
    dog.addImage(sadDog);
    //milk.addImage(m);
  }

  function feedDog(){
    dog.addImage(happyDog);
    //milk.addImage(b);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }