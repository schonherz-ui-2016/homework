function Polygon(name, ...sides) {
    if (arguments.length < 2) {
        throw 'Constructor of Polygon needs at least 2 arguments!';
    }
    this.name = name;
    if (sides.length > 1) {
        this.sides = sides.map(function(side) {
            return +side || 1;
        });
    } else {
        this.sides = new Array(sides[0]);
        this.sides.fill(1);
    }
    console.log('I am ready: ' + this.name);
    console.log('I am a polygon.');
    this.getName = function() {
        return this.name;
    };
}

Polygon.prototype.sayHello = function() {
    console.log('Hi! My name is ' + this.name + ' and I have ' + this.sides.length + ' sides.');
};

Polygon.prototype.countSides = function(count) {
    count = +count || 1;
    if (count <= this.sides.length) {
        console.log(count);
        this.countSides(count + 1);
    }
};

Polygon.prototype.countSidesH = function(count) {
    count = +count || 1;
    if (count <= this.sides.length) {
        this.countSidesH(count + 1);
        console.log(count);
    }
};

Polygon.prototype.countSidesM = function(count) {
    count = count === undefined ? this.sides.length : count;
    if (count > 0) {
        console.log(count);
        this.countSidesM(count - 1);
    }
};

function Quadrilateral(name, ...sides) {
    Polygon.call(this, name, 4);
    console.log('I am a quadrilateral.');
    for (var i = 0; i < sides.length && i < 4; i++) {
        this.sides[i] = +sides[i] || 1;
    }
}

Quadrilateral.prototype = Object.create(Polygon.prototype);
Quadrilateral.prototype.sayHello = function() {
    console.log('I am a quadrilateral. My sides: ' + this.sides + '.');
};

function Square(name, side) {
    Quadrilateral.call(this, name);
    console.log('I am a square.');
    this.sides.fill(+side || 1);
}

Square.prototype = Object.create(Quadrilateral.prototype);
Square.prototype.sayHello = function() {
    console.log('I am a square and lengths of my sides are ' + this.sides[0] + '.');
};

var p = new Polygon('poly', 8);
var q = new Quadrilateral('quad', 2, 3);
var s = new Square('squa', 5);
