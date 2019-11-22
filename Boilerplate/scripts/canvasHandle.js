 var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
        
	var a = 0;
	var r = 10;
        var l = 100;
        var xA = cvs.width/3;
        var yA = cvs.height/3;
        var xB = 2 * (cvs.width/3);
        var yB = cvs.height/3;
        
        
        
        var resizeCanvas = function(){
		cvs.style.width = window.innerWidth;
            	cvs.width = window.innerWidth;
		cvs.style.height = window.innerHeight;
            	cvs.height = window.innerHeight;
		console.log("Canvas size: " + cvs.width + ", " + cvs.height);
            	xA = cvs.width/3;
            	yA = cvs.height/3;
            	xB = 2 * (cvs.width/3);
            	yB = cvs.height/3;
	}

var drawCircle = function(ra, x, y){
	ctx.fillStyle = "white";
	ctx.fillRect(x - (ra/2), y - (ra/2), ra, ra);
	}
        var drawTouchInput = function(){
            if(distLX < 0 || distLX > 0){
                 ctx.fillStyle = "red";
                 ctx.fillRect(xA - r,yA - r,distLX *-1,r);
            }
            if(distRX != 0){
                 ctx.fillStyle = "blue";
                 ctx.fillRect(xB - r,yB - r,distRX *-1,r);
            }
        }
	var drawScreen = function(){
		ctx.fillStyle = "black";
        	ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.fillRect(0,0,cvs.width,cvs.height);
		//drawCircle(r,xA,yA);
		//drawCircle(r,xA + (Math.sin(a)*l), yA + (Math.cos(a)*l));
		a += 0.1;
            	drawTouchInput();
		window.requestAnimationFrame(drawScreen);
	}
