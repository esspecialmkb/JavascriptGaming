window.onload = function() {
		
		// Rect Object Prototype
		var rectObject = {
			x: null,
			y: null,
			w: null,
			h: null,
			fillStyle: null,
			
			create: function(x, y, w, h, fillStyle) {
				var obj = Object.create(this);
				obj.x = x;
				obj.y = y;
				obj.w = w;
				obj.h = h;
				obj.fillStyle = fillStyle;
				
				return obj;
			},
			
			render: function() {
				//Draw red square
				ctx.beginPath();
				ctx.rect(this.x, this.y, this.w, this.h);
				ctx.fillStyle = this.fillStyle;
				ctx.fill();
				ctx.closePath();
			}
		};
		
		// Arc prototype object
		var arcObject = {
			x: null,
			y: null,
			radius: null,
			aStart: null,
			aEnd: null,
			fillStyle: null,
			
			create: function(x, y, radius, aStart, aEnd, fillStyle) {
				var obj = Object.create(this);
				obj.x = x;
				obj.y = y;
				obj.radius = radius;
				obj.aStart = aStart;
				obj.aEnd = aEnd;
				obj.fillStyle = fillStyle;
				
				return obj;
			},
			
			render: function() {
				//Draw red square
				ctx.beginPath();
				ctx.arc(240, 160, 20, 0, Math.PI*2, false);
				ctx.fillStyle = this.fillStyle;
				ctx.fill();
				ctx.closePath();
			}
		};

		// Prototype Entity
		var particle = {
			xPos: null,
			yPos: null,
			xVel: null,
			yVel: null,
			create: function(x, y) {
				var obj = Object.create(this);
				obj.xPos = x;
				obj.yPos = y;
				obj.xVel = 0;
				obj.yVel = 0;
				return obj;
			},
			render: function() {
				ctx.fillStyle = "rgba(0, 0, 0)";
				ctx.fillRect(this.xPos, this.yPos, 5, 10);
			},
		};
		
		// Globals
		var drawObjectList = [];	// Drawing list
		
		var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		var centerY = height * .5,
		centerX = width * .5;
		
		// Creating prototype objects
		var actor = particle.create(50,50);
		drawObjectList.push( actor );
		
		var rect = rectObject.create(100,100,50,50, "rgba(0,0,0,1)");
		drawObjectList.push( rect );
		
		var rect2 = rectObject.create(300,200,60,60, "rgba(0,0,0,1)");
		drawObjectList.push( rect2 );
		
		// Event Listeners
		document.body.addEventListener("keydown", function(event) {
			console.log(event.keyCode + " key down");
			//up	38
			//down	40
			//left	37
			//right	39
			// space 32
			//enter 13
			//A	65
			//S	83
			//D	68
			//Q	81
			//W	87
			//E	104
			switch(event.keyCode){
				case 32: // space
					// code
				break;
				default:
					break;
			}
		}); 

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode + " key up");
			switch(event.keyCode){
				case 32: // space
					// code
				break;
				default:
					break;
			}
		});	

		//End Event Listener
		render();

		function renderList() {
			for(var d = 0; d < drawObjectList.length; d += 1) {
				// Need to access each item in the drawList
				dObj = drawObjectList[d];
				dObj.render();
			}
		}

		function render() {
			// Drawing code
			//ctx.fillStyle = "rgba(0, 0, 0)";
			ctx.clearRect(0, 0, width, height);

			//actor.render();
			//rect.render();
		
			renderList();
			
			requestAnimationFrame(render);
		}
	};