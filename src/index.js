console.log("Hello World Four");
import paper from "paper";
import { Point } from "paper/dist/paper-core";

// Set up canvas
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

/****************************************/
//Spirographs
/****************************************/

function Spirograph(xc, yc, col, R, r, l) {
    this.xc = xc; 
    this.yc = yc;
    this.col = col;
    this.R = R;
    this.r = r;
    this.l = l;

    this.k = r / R;
    this.n_rot = r;
    this.step = 0.5 * Math.PI / 180

    this.draw = function() {

        let myPath = new paper.Path();
        myPath.strokeColor = this.col;
        myPath.strokeWidth = 3; 
        
        let n_rot = this.n_rot;
        let step = this.step;
        let R = this.R;
        let k = this.k;
        let l = this.l;
        let xc = this.xc;
        let yc = this.yc;
        for (let a = 0; a < 2*Math.PI*n_rot; a += step) {
            let x = R * ((1-k)*Math.cos(a) + l*k*Math.cos(((1-k)/k)*a));
            let y = R * ((1-k)*Math.sin(a) - l*k*Math.sin(((1-k)/k)*a));
            myPath.add(new Point(xc+x, yc+y))        
        }
    };

    this.createOuter = function() {
        let R = this.R;
        
        let outer = new paper.Path.Circle(paper.view.center, R);
        return outer;
    };

    this.createInner = function(angle) {
        let xc = this.xc; 
        let yc = this.yc;
        let R = this.R;
        let r = this.r;

        let innerCenterY = yc + (R-r)*Math.sin(angle);
        let innerCenterX = xc + (R-r)*Math.cos(angle);
        let innerCenterPoint = new paper.Point(innerCenterX, innerCenterY);
        let innerCenter = new paper.Path.Circle(innerCenterPoint, 2)
        let inner = new paper.Path.Circle(innerCenterPoint, r);
        return [inner, innerCenter];
    };

    this.calcPoint = function(angle) {
        let R = this.R;
        let k = this.k;
        let l = this.l;
        let xc = this.xc;
        let yc = this.yc;

        let x = R * ((1-k)*Math.cos(angle) + l*k*Math.cos(((1-k)/k)*angle));
        let y = R * ((1-k)*Math.sin(angle) - l*k*Math.sin(((1-k)/k)*angle));
        
        let coord = new paper.Point(x+xc, y+yc);
        let point = new paper.Path.Circle(coord, 2);
        return point;
    };

    this.createPCLine = function(P, C) {
        let PCLine = new paper.Path.Line(P, C);
        return PCLine;
    };

}

var center = paper.view.center;
var mySpiro = new Spirograph(center.x, center.y, 'blue', 360, 80, 0.77);
mySpiro.draw();

//draw outer circle
mySpiro.outerCircle = mySpiro.createOuter()
mySpiro.outerCircle.strokeColor = 'red'
mySpiro.outerCircle.strokeWidth = 3

//draw inner circle
var inner = mySpiro.createInner(Math.PI/4);
mySpiro.innerCircle = inner[0];
mySpiro.innerCircle.strokeColor = 'green'
mySpiro.innerCircle.strokeWidth = 3

//set C
mySpiro.C = inner[1]
mySpiro.C.strokeColor = 'yellow';
mySpiro.C.strokeWidth = 5;

//set P
mySpiro.P = mySpiro.calcPoint(Math.PI/4);
mySpiro.P.strokeColor = 'yellow';
mySpiro.P.strokeWidth = 5;

//set PCLine
mySpiro.PCLine = mySpiro.createPCLine(
    new paper.Point(mySpiro.C.position.x, mySpiro.C.position.y),
    new paper.Point(mySpiro.P.position.x, mySpiro.P.position.y)
); //for rendering purposes, points are stored as circles, not as actual points
mySpiro.PCLine.strokeColor = 'yellow';
mySpiro.PCLine.strokeWidth = 3;


paper.view.onFrame = function(event) {

    let angleStep = event.count*mySpiro.k/10; 
    
    //remove and redraw the inner circle
    let inner = mySpiro.createInner(angleStep);
    mySpiro.innerCircle.remove();
    mySpiro.innerCircle = inner[0];
    mySpiro.innerCircle.strokeColor='green';
    mySpiro.innerCircle.strokeWidth = 3;

    //remove and redraw C
    mySpiro.C.remove();
    mySpiro.C = inner[1];
    mySpiro.C.strokeColor = 'yellow';
    mySpiro.C.strokeWidth = 5;

    //remove and redraw P
    mySpiro.P.remove();
    mySpiro.P = mySpiro.calcPoint(angleStep);
    mySpiro.P.strokeColor = 'yellow';
    mySpiro.P.strokeWidth = 5;

    //remove and redraw PCLine
    mySpiro.PCLine.remove();
    mySpiro.PCLine = mySpiro.createPCLine(
        new paper.Point(mySpiro.C.position.x, mySpiro.C.position.y),
        new paper.Point(mySpiro.P.position.x, mySpiro.P.position.y)
    );
    mySpiro.PCLine.strokeColor = 'yellow';
    mySpiro.PCLine.strokeWidth = 3;
}



/**************************************************/
//Captain America Shield
/**************************************************/
// //set up circles
// var outerDia = 260;
// var circles = [];
// for (let i = 0; i <4; i++) {
//     circles.push(new paper.Path.Circle(paper.view.center, outerDia - 60*i));
// }
// circles[0].fillColor = 'red';
// circles[1].fillColor = 'white';
// circles[2].fillColor = 'red';
// circles[3].fillColor = 'blue';

// //set up star
// var star = new paper.Path.Star(paper.view.center, 5, outerDia-60*3, outerDia-60*3.8);
// star.fillColor = 'white';
