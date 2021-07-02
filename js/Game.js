class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1img)
    car2 = createSprite(300,200);
    car2.addImage(car2img)
    car3 = createSprite(500,200);
    car3.addImage(car3img)
    car4 = createSprite(700,200);
    car4.addImage(car4img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("yellow")
      image(trackimg,0,-displayHeight*5,displayWidth,displayHeight*6)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
         fill("pink")
         ellipse(x,y,100,150)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
         
        textSize(15);
        fill("cyan")
        textAlign(CENTER)
        text(allPlayers[plr].name,x,y+100)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>4900){
      gameState=2
    }


    drawSprites();
  }

  END(){
    console.log("game over")
   // alert("game over")
    var p = createElement('h1')
    p.html("game over")
    p.position(displayWidth/2,displayHeight/2-100)
    textSize(25)
    text("game ended",displayWidth/2,displayHeight/2-300)

  }
}
