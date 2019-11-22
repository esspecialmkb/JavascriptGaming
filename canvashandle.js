
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
															var w = document.documentElement.clientWidth;
															var h = document.documentElement.clientHeight;
															console.log(w + ", " + h);
															cvs.style.width = w;
            cvs.width = w;
															cvs.style.height = h;
            cvs.height = h;

            xA = cvs.width/3;
            yA = cvs.height/3;
            xB = 2 * (cvs.width/3);
            yB = cvs.height/3;
										}
