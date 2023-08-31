const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    let x = -1000;
    let y = 0;
    let charY = 672;
    let yVelocity = 0;
    let xVelocity = 0;

    let scene = 1;
    
    let drunk = false;

    let jumping = false;

    const char = new Image();
    char.src = "./Default.png";
    
    const house = new Image();
    house.src = "./house.png"

    const Lamp = new Image();
    Lamp.src = "./Lamp.png"

    const bartender = new Image();
    bartender.src = "./bartender.png"

    const arms = new Image();
    arms.src = "./bartenderArms.png"

    const grass = new Image();
    grass.src = "./grass.png"

    const sceneTwo = new Image();
    sceneTwo.src = "./scene2.png"

    const bar = new Image();
    bar.src = "./bar.png"

    const sky = new Image();
    sky.src = "./sky.png"

    const fire = new Image();
    fire.src = "./fire/1.png"

    const drunkFilter = new Image();
    drunkFilter.src = "./drunkFilter/1.png"

    let tick = 0;
    let charFrame = 8;

    let isAnimation = false;

    let flipped = false;

    let fireFrame = 1;

    let drunkFrame = 1;

    document.addEventListener('keydown', (event) => {

        if(event.key == "a" && x < 200){
            xVelocity = drunk ? -24 : 24;
	    isAnimation = true;
	    flipped = false;
        } else if ( x > 0 ){
	    x = 0;
	}

        if(event.key == "d" && x > -1200){
            xVelocity = drunk ? 24 : -24;
	    isAnimation = true;
	    flipped = true;
        } else if ( x < -1000 ){
	    x = -1000;
	}
	
	if((event.code == "Space" || event.key == "w") && jumping == false){
            yVelocity -= 30;
	    jumping = true;
        }
	if(event.key == "e" && (scene == 1 || scene == 2) && x < 0 && x > -100){
	    if(scene == 1) scene = 2;
	    else if(scene == 2) scene = 1;
	}
	if(event.key == "e" && scene == 1 && x < -472 && x > -600){
	    drunk = false;
	}
	if(event.key == "e" && scene == 2 && x < -472 && x > -600){
	    drunk = true;
	}


    }, false);

    document.addEventListener('keyup', (event) => {
	if(event.key == "a"){
            char.src = flipped ? "./DefaultFlipped.png":"./Default.png";
            isAnimation = false;
	    xVelocity = 0;
        }

        if(event.key == "d"){
            char.src = flipped ? "./DefaultFlipped.png":"./Default.png";
            isAnimation = false;
	    xVelocity = 0;
        }
    }, false);

    setInterval(onTimerTick, 33);

    function animate(char){
	
	if(charFrame == 1) charFrame = 2
	else if(charFrame == 2) charFrame = 3
	else if(charFrame == 3) charFrame = 4
	else if(charFrame == 4) charFrame = 5
	else if(charFrame == 5) charFrame = 6
	else if(charFrame == 6) charFrame = 7
	else if(charFrame == 7) charFrame = 8
	else if(charFrame == 8) charFrame = 1

	char.src = flipped ? `./running/${charFrame}.png`:`./running/${charFrame}Flipped.png`;
    }

    function animateFire(){
	if(fireFrame == 1) fireFrame = 2
	else if(fireFrame == 2) fireFrame = 3
	else if(fireFrame == 3) fireFrame = 1

	fire.src = `./fire/${fireFrame}.png`;
    }

    function animateDrunk(){
	if(drunkFrame == 1) drunkFrame = 2
	else if(drunkFrame == 2) drunkFrame = 1

	drunkFilter.src = `./drunkFilter/${drunkFrame}.png`;
    }
    
    function onTimerTick() {
        ctx.fillStyle = "#5ba845";
        ctx.fillRect(0, 0, 1000, 1000);
	
	yVelocity += 3;
	charY += yVelocity;
	x += xVelocity;	
	xVelocity *= 0.9;
	yVelocity *= 0.9;

	if( charY > 672 ){
	    yVelocity = 0;
	    charY = 672;
	    jumping = false;
	}
	charY += yVelocity;

	if(tick != 1800){
	    tick++;
	    if ((tick % 10) == 0){
		animateFire();
		if (drunk) animateDrunk();
	    }
	    if((tick % 3) == 0 && isAnimation == true) animate(char)
	} else {
	    tick = 0;
	}
	
	if(scene == 1){
	ctx.drawImage(sky, x, y, 2000, 1000);
	ctx.drawImage(grass, x, y, 2000, 1000);
	ctx.drawImage(sky, x-1996, y, 2000, 1000);
	ctx.drawImage(grass, x-1995, y, 2000, 1000);
	ctx.drawImage(sky, x+1996, y, 2000, 1000);
	ctx.drawImage(grass, x+1995, y, 2000, 1000);
	ctx.drawImage(house, x, 200, 600, 600);
	} else if(scene == 2){
	    ctx.drawImage(sceneTwo, x, y, 2000, 1000);
	    ctx.drawImage(bartender, x+1100, y+645, 128, 128);
	    ctx.drawImage(bar, x, y, 2000, 1000);
	    ctx.drawImage(arms, x+1100, y+645, 128, 128);
	}

        ctx.drawImage(char, 440, charY, 128, 128);
	
	if(scene == 1){
	    ctx.drawImage(fire, x+940, 680, 120, 120);
	    if(drunk) ctx.drawImage(drunkFilter, 0, 0, 2000, 1000);
	} else if(scene == 2){
	    ctx.drawImage(Lamp, x, y, 2000, 1000);
	    if(drunk) ctx.drawImage(drunkFilter, 0, 0, 2000, 1000);
	}

	if(x < 0 && x > -50){
            ctx.fillStyle = "#FFFFFF"
	    ctx.fillRect(410, 570, 200, 80)
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000"
	    ctx.strokeRect(410, 570, 200, 80);
            ctx.fillText("Öppna dörr", 430, 620);
	}
	
	if(x < -472 && x > -600 && scene == 1){
            ctx.fillStyle = "#FFFFFF";
	    ctx.fillRect(410, 570, 200, 80);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
	    ctx.strokeRect(410, 570, 200, 80);
            ctx.fillText("Koka Kaffe", 430, 620);
	}

	if(x < -472 && x > -600 && scene == 2){
            ctx.fillStyle = "#FFFFFF";
	    ctx.fillRect(410, 570, 200, 80);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
	    ctx.strokeRect(410, 570, 200, 80);
            ctx.fillText("Drick öl", 430, 620);
	}
    }