window.addEventListener("load", init, false);

var Engine;
var context;

function init() {

    var canvas = document.getElementById("canvas");
    Engine = new GameEngine(canvas, 800, 400);
    Engine.init();

    // var grid = createTestGrid(300, -100, 50, 50, 5, 5);
    // var mouse = new Point(0, 0);
    // var isConverted = false;

    var mouse = new Point(0, 0);

    var map = new Map(testdata);
    var unit = new Unit(0,0);
    map.addUnit(unit);

    Log.addLine(Engine, "mouse.isDown");

    Engine.onUpdate = function () {

        context.fillStyle = "#F7F8F9";
        context.fillRect(0, 0, Engine.cw, Engine.ch);

        map.draw();

        mouse.x = Engine.mouse.x;
        mouse.y = Engine.mouse.y;
        if (Engine.mouse.isDown) {
            for (var i = 0; i < map.tiles.length; i++) {
                if (mouse.isInRect(map.tiles[i].rect)) {
                    unit.move(map.tiles[i]);
                    map.tiles[i].rect.draw("rgba(255,0,255,1)", "rgba(255,0,255,0.3)")
                };
            };
        };
        // grid.draw();

        // if (Engine.mouse.isDown && !isConverted) {
        //     isConverted = true;
        //     grid.toIso();
        // };

        // mouse.x = Engine.mouse.x;
        // mouse.y = Engine.mouse.y;

        // mouse.draw();

        // for (var i = 0; i < grid.tiles.length; i++) {
        //     if (mouse.isInRect(grid.tiles[i])) {
        //         grid.tiles[i].draw("rgba(255,0,255,1)", "rgba(255,0,255,0.3)");
        //     }
        // };

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


function createTestGrid(x0, y0, tw, th, c, r) {

    var tiles = [];
    var allPoints = [];

    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            var x = x0 + (tw * i);
            var y = y0 + (th * j);
            var tile = new Rect(x, y, tw, th);
            tiles.push(tile);
            allPoints = allPoints.concat(tile.points);
        };
    };

    return {
        tiles: tiles,
        points: allPoints,
        draw: function() {
            for (var i = 0; i < tiles.length; i++) tiles[i].draw();
        },
        toIso: function() {
            for (var i = 0; i < allPoints.length; i++) pointToIso(allPoints[i])
        }
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

function Unit(x, y) {
    this.x = x;
    this.y = y;
    this.tile = null;
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
    context.fill(path);

}

var testdata = [];
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        testdata.push({ x: j, y: i, objects: [] });
    };
};
testdata[7].objects = [ { type: "crate" } ];
testdata[17].objects = [ { type: "wall", param: "l" } ];



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

function findPath(start, finish, tiles) {

    var open = [];
    var close = [];
    var current = null;

    function findWay(tile) {
        
        var direction,
            next;

        for (direction in tile.nextTiles) {

            next = tile.nextTiles[direction];

            if (isPassableWay(tile, next, direction) {

                if (!open.contains(next)) {
                    open.push(next);
                    next.parent = tile;
                    next.G += tile.G + (direction.length == 1 ? 10 : 14);
                    next.H = 10 * (Math.abs(next.x - finish.x) + Math.abs(next.y - finish.y));
                    next.F = next.G + next.H;
                } else {

                }

            }




            // next = tile.nextTiles[direction];
            // objs = tile.nextTiles[direction].objects;
            // for (var i = 0; i < objs[i].length; i++) {
            //     if (objs[i] instanceof Wall) {
            //         if (direction = objs[i].side) {};
            //     } else {
            //         if (!objs[i].isPassable) {
            //             continue;
            //         };
            //     }
            // };
        }
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
            if (tileB.objects[i].instanceof Wall) {
                var sum = direction + tileA.objects[i].side;
                // diagonal direction
                if (direction.length == 2 && direction.indexOf(tileA.objects[i].side) == -1) {
                    return false;
                // vertical/horizontal direction
                } else if (direction.length == 1 && (sum == "rl" || sum == "lr" || sum == "tb" || sum == "bt")) {
                    return false;
                }
            } else if (!tileB.objects[i].isPassable) {
                return false;
            }
        }

        return true;

    }

    // function Waypoint(a, b, cost) {
    //     this.a = a;
    //     this.b = b;
    //     this.cost = cost;
    // }

}