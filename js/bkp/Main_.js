window.addEventListener("load", init, false);

var Engine;
var context;

function init() {

    var canvas = document.getElementById("canvas");
    Engine = new GameEngine(canvas, 800, 400);
    Engine.init();


    var testdata = [];
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            testdata.push({ x: j, y: i, objects: [] });
        };
    };
    testdata[7].objects = [ { type: "crate" } ];
    testdata[24].objects = [ { type: "wall", param: "l" }, { type: "wall", param: "t" } ];
    testdata[34].objects = [ { type: "wall", param: "l" } ];

    var mouse = new Point(0, 0);

    var map = new Map(testdata);
    var unit = new Unit(2,2);
    map.addUnit(unit);

    var path = [];

    Log.addLine(Engine, "mouse.isDown");

    Engine.onUpdate = function () {

        context.fillStyle = "#F7F8F9";
        context.fillRect(0, 0, Engine.cw, Engine.ch);

        map.draw();

        for (var i = 0; i < path.length; i++) {
            path[i].draw();
        };

    }

    Engine.onMouseUp = function () {

        mouse.x = Engine.mouse.x;
        mouse.y = Engine.mouse.y;

        for (var i = 0; i < map.tiles.length; i++) {
            if (mouse.isInRect(map.tiles[i].rect)) {
                
                path = [];
                var p = findPath(unit.tile, map.tiles[i]);
                if (p === false) {
                    path = [new cross(map.tiles[i].x, map.tiles[i].y)];
                    return;
                }
                for (var j = 0; j < p.length; j++) {
                    path.push(new Point(p[j].rect.x, p[j].rect.y));
                };

                return;

            };
        };

    }

}


function cross(x,y) {
    this.x = x;
    this.y = y;
    this.draw = function() {
        var path = new Path2D();
        path.arc(this.x * Global.TILE_SIZE + Global.TILE_SIZE / 2, this.y * Global.TILE_SIZE + Global.TILE_SIZE / 2, 10, 0, Math.PI*2);
        context.fillStyle = "red";
        context.fill(path);
    }
}


function Tile(x, y) {
    this.x = x;
    this.y = y;
    this.rect = new Rect((x * Global.TILE_SIZE) + Global.TILE_SIZE / 2, (y * Global.TILE_SIZE) + Global.TILE_SIZE / 2, Global.TILE_SIZE, Global.TILE_SIZE);
    this.objects = [];
    this.nextTiles = {
        lt: null,
        t: null,
        rt: null,
        l: null,
        r: null,
        lb: null,
        b: null,
        rb: null
    };
    this.parent = null;
    this.F = 0;
    this.G = 0;
    this.H = 0;
}

Tile.prototype.draw = function() {
    this.rect.draw("rgba(100,100,100,0.3)", "rgba(100,100,100,0.1)");
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].draw();
    };
}

// sides: "l", "t", "r", "b";
function Wall(side, tile) {
    this.side = side;
    this.isPassable = false;

    // for test
    switch (side) {
        case "t": this.line = tile.rect.sides[0]; break;
        case "r": this.line = tile.rect.sides[1]; break;
        case "b": this.line = tile.rect.sides[2]; break;
        case "l": this.line = tile.rect.sides[3]; break;
    }
}

Wall.prototype.draw = function() {
    this.line.draw("rgba(200,200,0,0.9)");
}

function Crate(tile) {
    this.rect = tile.rect;
    this.isPassable = false;
}

Crate.prototype.draw = function() {
    this.rect.draw("rgba(200,200,0,0.9)", "rgba(255,255,0,0.2)");
}


function Map(data) {
    var tiles = this.tiles = [];
    for (var i = 0; i < data.length; i++) {
        var tile = new Tile(data[i].x, data[i].y);
        for (var j = 0; j < data[i].objects.length; j++) {
            switch (data[i].objects[j].type) {
                case "crate": data[i].objects[j] = new Crate(tile); break;
                case "wall": data[i].objects[j] = new Wall(data[i].objects[j].param, tile); break;
            }
        };
        tile.objects = data[i].objects;
        tiles.push(tile);
    };

    populateNextTiles();

    function populateNextTiles() {
        for (var i = 0; i < tiles.length; i++) {
            // this.tiles[i].nextTiles()
            for (var j = 0; j < tiles.length; j++) {

                if (tiles[j] == tiles[i]) continue;
                
                // lt
                if (tiles[j].x == tiles[i].x - 1 && tiles[j].y == tiles[i].y - 1) {
                    tiles[i].nextTiles.lt = tiles[j];
                }
                // t
                if (tiles[j].x == tiles[i].x && tiles[j].y == tiles[i].y - 1) {
                    tiles[i].nextTiles.t = tiles[j];
                }
                // rt
                if (tiles[j].x == tiles[i].x + 1 && tiles[j].y == tiles[i].y - 1) {
                    tiles[i].nextTiles.rt = tiles[j];
                }
                // l
                if (tiles[j].x == tiles[i].x - 1 && tiles[j].y == tiles[i].y) {
                    tiles[i].nextTiles.l = tiles[j];
                }
                // r
                if (tiles[j].x == tiles[i].x + 1 && tiles[j].y == tiles[i].y) {
                    tiles[i].nextTiles.r = tiles[j];
                }
                // lb
                if (tiles[j].x == tiles[i].x - 1 && tiles[j].y == tiles[i].y + 1) {
                    tiles[i].nextTiles.lb = tiles[j];
                }
                // b
                if (tiles[j].x == tiles[i].x && tiles[j].y == tiles[i].y + 1) {
                    tiles[i].nextTiles.b = tiles[j];
                }
                // rb
                if (tiles[j].x == tiles[i].x + 1 && tiles[j].y == tiles[i].y + 1) {
                    tiles[i].nextTiles.rb = tiles[j];
                }

            };

        };
    }
}

Map.prototype.draw = function() {
    for (var i = 0; i < this.tiles.length; i++) {
        this.tiles[i].draw();
    };
}

Map.prototype.addUnit = function(unit) {
    for (var i = 0; i < this.tiles.length; i++) {
        if (this.tiles[i].x == unit.x && this.tiles[i].y == unit.y) {
            this.tiles[i].objects.push(unit);
            unit.tile = this.tiles[i];
        };
    };
}

Map.prototype.addObject = function(object, x, y) {
    for (var i = 0; i < this.tiles.length; i++) {
        if (this.tiles[i].x == x && this.tiles[i].y == y) {
            this.tiles[i].objects.push(object);
        };
    };
}


function Unit(x, y) {
    this.x = x;
    this.y = y;
    this.tile = null;
    this.isPassable = false;
}

Unit.prototype.move = function(tile) {
    this.tile.objects.remove(this);
    tile.objects.push(this);
    this.tile = tile;
    this.x = tile.x;
    this.y = tile.y;
}

Unit.prototype.draw = function() {

    var path = new Path2D();
    path.arc(this.x * Global.TILE_SIZE + Global.TILE_SIZE / 2, this.y * Global.TILE_SIZE + Global.TILE_SIZE / 2, 20, 0, Math.PI*2);
    context.fillStyle = "#fff";
    context.strokeStyle = "#333";
    context.fill(path);
    context.stroke(path);

}



function findPath(start, finish) {

    if (start == finish) return false;
    for (var i = 0; i < finish.objects.length; i++) 
        if (!(finish.objects[i] instanceof Wall) && !finish.objects[i].isPassable) return false;


    var open = [start];
    var close = [];
    var result;

    searchPath();

    return result;

    function searchPath() {

        // found way
        if (open.contains(finish)) {
            result = [];
            var tile = finish;
            while (tile != start) {
                result.push(tile);
                tile = tile.parent;
            }
            return;
        }

        // no way
        if (open.length == 0) return false;

        open.sort(function(a, b) {
            return a.F - b.F;
        });

        processTile(open[0]);

        searchPath();

    }

    function processTile(tile) {

        moveFromOpenToClose(tile);
        
        var direction,
            next;

        for (direction in tile.nextTiles) {

            next = tile.nextTiles[direction];

            if (next === null || close.contains(next)) continue;

            if (isPassableWay(tile, next, direction)) {

                if (!open.contains(next)) {
                    open.push(next);
                    next.parent = tile;
                    next.G = getG(next, direction);
                    next.H = getH(next);
                    next.F = next.G + next.H;
                } else if (next.G < tile.G) { // getG(tile, direction)
                    next.parent = tile;
                    next.G = getG(next, direction);
                    next.F = next.G + next.H;
                }

            }

        }
    }

    function moveFromOpenToClose(tile) {
        open.remove(tile);
        close.push(tile);
    }

    function getG(tile, direction) {
        var parentG = tile.parent != null ? tile.parent.G : 0; 
        return parentG + (direction.length == 1 ? 10 : 14)
    }

    function getH(tile) {
        return 10 * (Math.abs(tile.x - finish.x) + Math.abs(tile.y - finish.y));
    }

    function isPassableWay(tileA, tileB, direction) {

        // Check walls in start tile
        for (var i = 0; i < tileA.objects.length; i++) {
            if (tileA.objects[i] instanceof Wall
                && !tileA.objects[i].isPassable
                && direction.indexOf(tileA.objects[i].side) != -1) {
                return false;
            }
        }

        // Check all objects in destination tile
        for (var i = 0; i < tileB.objects.length; i++) {
            if (tileB.objects[i] instanceof Wall) {
                var sum = direction + tileB.objects[i].side;
                // diagonal direction
                if (direction.length == 2 && direction.indexOf(tileB.objects[i].side) == -1) {
                    return false;
                // vertical/horizontal direction
                } else if (direction.length == 1 && (sum == "rl" || sum == "lr" || sum == "tb" || sum == "bt")) {
                    return false;
                }
            } else if (!tileB.objects[i].isPassable) {
                close.push(tileB);
                return false;
            }
        }

        return true;

    }

}




var isoToScreen = function(x, y) {
    var posX = (x - y);
    var posY = (x + y) / 2;

    return {x: posX, y: posY};
};

var screenToIso = function(screenX, screenY) {
  var isoX = screenY + screenX / 2;
  var isoY = screenY - screenX / 2;

  return {x:isoX, y:isoY};
}

var pointToIso = function(p) {
    var px = p.x;
    var py = p.y;
    p.x = px - py;
    p.y = (px + py) / 2;
}