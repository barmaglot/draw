function GameEngine(canvas, width, height, showFPS) {

	if (!canvas.getContext) {
		document.body.innerHTML = "Canvas is not supported";
		return;
	}

	// store canvas in engine instance
	this.canvas = canvas;
	// set global var context
	context = canvas.getContext("2d");
	if (width) this.canvas.width = width;
	if (height) this.canvas.height = height;
    this.cw = canvas.width;
    this.ch = canvas.height;
    this.hcw = canvas.width / 2;
    this.hch = canvas.height / 2;
    var mouse = this.mouse = { x: this.hcw, y: this.hch, isDown: false };
	var offset = this.offset = { left: canvas.offsetLeft, top: canvas.offsetTop };

	this.isPaused = false;

	var UI = this.UI = [];

	// init fps counter
	var fps = {
		current: 0,
		now: 0,
		lastUpdate: (new Date) * 1 - 1,
		filter: 50
	}
	if (showFPS !== false) {
	    var fpsOut = document.getElementById("fps");
	    setInterval(function () {
	        fpsOut.innerHTML = fps.current.toFixed(1) + "fps";
	    }, 100);
	}

    
    /* Private Events */

	var canvasMouseDown = function (e) {

	    mouse.isDown = true;
	    mouse.x = e.clientX - offset.left;
	    mouse.y = e.clientY - offset.top;

	    var eventRised = false;
	    for (var i = UI.length - 1; i >= 0; i--) {
	        if (!eventRised && UI[i].isVisible && UI[i].isMouseEventEnabled && UI[i].hitTest(mouse)) {
	            eventRised = true;
	            UI[i].isMouseDown = true;
	            UI[i].mousedown();
	                
	        } else {
	            UI[i].isMouseDown = false;
	        }
	    }

	    this.onMouseDown(e);

	}.bind(this);

	var canvasMouseMove = function (e) {

	    mouse.x = e.clientX - offset.left;
	    mouse.y = e.clientY - offset.top;

	    for (var i = UI.length - 1; i >= 0; i--) {
	        if (UI[i].isVisible && UI[i].isMouseEventEnabled && UI[i].hitTest(mouse)) {
	            UI[i].isMouseOver = true;
	            UI[i].mousemove();
	        } else {
	            UI[i].isMouseOver = false;
	        }
	    }

	    this.onMouseMove(e);

	}.bind(this);

	var documentMouseUp = function (e) {

	    mouse.isDown = false;
	    mouse.x = e.clientX - offset.left;
	    mouse.y = e.clientY - offset.top;
	    
	    for (var i = UI.length - 1; i >= 0; i--) {
	    	if (UI[i].isVisible && UI[i].isMouseEventEnabled && UI[i].isMouseDown && UI[i].hitTest(mouse)) {
	            UI[i].isMouseUp = true;
	            UI[i].mouseup();
	        }
	    	UI[i].isMouseDown = false;
	        UI[i].isMouseUp = false;
	    }

	    this.onMouseUp();

	}.bind(this);

	var windowFocus = function (e) {

	}.bind(this);

	var windowBlur = function (e) {
		//this.isPaused = true;
	}.bind(this);

	var documentKeyDown = function (e) {
	    // switch (e.which) {
	    //     case 37:
	    //         keys.left = true;
	    //         break;
	    //     case 39:
	    //         keys.right = true;
	    //         break;
	    //     case 38:
	    //         keys.up = true;
	    //         break;
	    //     case 40:
	    //         keys.down = true;
	    //         break;
	    //     case 27:
	    //         keys.esc = true;
	    //         break;
	    // }
	}.bind(this);

	var documentKeyUp = function (e) {
	    // switch (e.which) {
	    //     case 37:
	    //         keys.left = false;
	    //         break;
	    //     case 39:
	    //         keys.right = false;
	    //         break;
	    //     case 38:
	    //         keys.up = false;
	    //         break;
	    //     case 40:
	    //         keys.down = false;
	    //         break;
	    //     case 40:
	    //         keys.esc = false;
	    //         break;
	    // }
	}.bind(this);

	// init events
    window.addEventListener("focus", windowFocus, false);
	window.addEventListener("blur", windowBlur, false);
	document.addEventListener("keydown", documentKeyDown, true);
	document.addEventListener("keyup", documentKeyUp, true);
	canvas.addEventListener("mousedown", canvasMouseDown, false);
    canvas.addEventListener("mousemove", canvasMouseMove, false);
    document.addEventListener("mouseup", documentMouseUp, false);

    // redraw event
    var update = function () {

	    this.onUpdate();

	    for (var i = 0; i < UI.length; i++) {
	        if (UI[i].isVisible) UI[i].draw();
	    }

	    this.onUpdateUI();

	    // FPS counter
	    var thisFrameFPS = 1000 / (((fps.now = new Date) - fps.lastUpdate) || 1);
	    fps.current += (thisFrameFPS - fps.current) / fps.filter;
	    fps.lastUpdate = fps.now;

	    // for debug
	    Log.update();

	}.bind(this);

    // set game loop

    this.init = function () {
		Utils.limitLoop(update, 60);
	}

}


// Public methods for override

// GameEngine.prototype.init = function () { }

GameEngine.prototype.onMouseDown = function (e) { }

GameEngine.prototype.onMouseMove = function (e) { }

GameEngine.prototype.onMouseUp = function (e) { }

GameEngine.prototype.onUpdate = function () { }

GameEngine.prototype.onUpdateUI = function () { }