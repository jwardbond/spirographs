console.log("Hello World Four");
import paper from "paper";
import { Point } from "paper/dist/paper-core";

// Set up canvas
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

/****************************************/
//Spirographs
/****************************************/

function Spirograph(xc, yc, col, traceLen, R, r, l) {
    this.xc = xc; 
    this.yc = yc;
    this.col = col;
    this.R = R;
    this.r = r;
    this.l = l;

    this.k = r / R;
    this.n_rot = r;
    this.step = 0.5 * Math.PI / 180

    this.outerCircle = new paper.Path.Circle(paper.view.center, R);
    
    /***************************Construction Methods and Vars***************/
    this.calcC = function(angle) {
        let xc = this.xc;
        let yc = this.yc;

        let y = (R-r)*Math.sin(angle);
        let x = (R-r)*Math.cos(angle);
        let C = new paper.Point(x+xc, y+yc);

        return C;
    };
    this.C = this.calcC(0);
    this.innerCircle = new paper.Path.Circle(this.C, r);
    this.CCircle = new paper.Path.Circle(this.C, 2);

    this.calcP = function(angle) {
        let R = this.R;
        let k = this.k;
        let l = this.l;
        let xc = this.xc;
        let yc = this.yc;

        let x = R * ((1-k)*Math.cos(angle) + l*k*Math.cos(((1-k)/k)*angle));
        let y = R * ((1-k)*Math.sin(angle) - l*k*Math.sin(((1-k)/k)*angle));

        let P = new paper.Point(x+xc, y+yc);
        return P;
    };
    this.P = this.calcP(0)
    this.PCircle = new paper.Path.Circle(this.P, 2)

    this.traceLen = traceLen
    this.trace = new paper.Path();
    for (let i =0; i < traceLen; i++) {
        this.trace.add(new paper.Point(this.P, this.P));
    }

    this.createPCLine = function() {
        let PCLine = new paper.Path.Line(this.P, this.C);
        return PCLine;
    };
    this.PCLine = this.createPCLine();

    /******************************Utility Methods ********************************/
    this.animate = function(angle) { 

        //Move the inner circle
        this.C = this.calcC(angle);
        this.innerCircle.position = this.C;
        this.CCircle.position = this.C;

        //Move P
        let P = this.calcP(angle);
        this.P = P
        this.PCircle.position = this.P;
        
        //Move PCLine
        this.PCLine.firstSegment.point = this.C;
        this.PCLine.lastSegment.point = this.P;
        console.log(this.PCLine.firstSegment);

        //Adjust trace
        this.trace.add(P);
        this.trace.removeSegment(0);
    };

    this.draw = function() {

        let myPath = new paper.Path();
        myPath.insertBelow(this.innerCircle); //fix layering bug
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
}

var center = paper.view.center;
var mySpiro = new Spirograph(center.x, center.y, '#2F0014', 75, 300, 170, 0.9);
mySpiro.draw();

//Init Colours
mySpiro.outerCircle.strokeColor = '#B0A9DA';
mySpiro.innerCircle.strokeColor = '#4EB6B2';
mySpiro.CCircle.strokeColor = '#4EB6B2';
mySpiro.PCircle.strokeColor = '#FFD8E9';
mySpiro.PCLine.strokeColor = '#4EB6B2';
mySpiro.trace.strokeColor = 'white'

mySpiro.outerCircle.strokeWidth = 3;
mySpiro.innerCircle.strokeWidth = 3;
mySpiro.CCircle.strokeWidth = 5;
mySpiro.PCircle.strokeWidth = 5;
mySpiro.PCLine.strokeWidth = 3;
mySpiro.trace.strokeWidth = 3;


paper.view.onFrame = function(event) {
    let angle = event.count*mySpiro.k/10;
    mySpiro.animate(angle);
}



// //draw outer circle
// mySpiro.outerCircle = mySpiro.createOuter()
// mySpiro.outerCircle.strokeColor = 'red'
// mySpiro.outerCircle.strokeWidth = 3

// //draw inner circle
// var inner = mySpiro.createInner(Math.PI/4);
// mySpiro.innerCircle = inner[0];
// mySpiro.innerCircle.strokeColor = 'green'
// mySpiro.innerCircle.strokeWidth = 3

// //set C
// mySpiro.C = inner[1]
// mySpiro.C.strokeColor = 'yellow';
// mySpiro.C.strokeWidth = 5;

// //set P
// mySpiro.P = mySpiro.calcPoint(Math.PI/4);
// mySpiro.P.strokeColor = 'yellow';
// mySpiro.P.strokeWidth = 5;

// //set PCLine
// mySpiro.PCLine = mySpiro.createPCLine(
//     new paper.Point(mySpiro.C.position.x, mySpiro.C.position.y),
//     new paper.Point(mySpiro.P.position.x, mySpiro.P.position.y)
// ); //for rendering purposes, points are stored as circles, not as actual points
// mySpiro.PCLine.strokeColor = 'yellow';
// mySpiro.PCLine.strokeWidth = 3;

// paper.view.onFrame = function(event) {

//     let angleStep = event.count*mySpiro.k/10; 
    
//     //remove and redraw the inner circle
//     let inner = mySpiro.createInner(angleStep);
//     mySpiro.innerCircle.remove();
//     mySpiro.innerCircle = inner[0];
//     mySpiro.innerCircle.strokeColor='green';
//     mySpiro.innerCircle.strokeWidth = 3;

//     //remove and redraw C
//     mySpiro.C.remove();
//     mySpiro.C = inner[1];
//     mySpiro.C.strokeColor = 'yellow';
//     mySpiro.C.strokeWidth = 5;

//     //remove and redraw P
//     mySpiro.P.remove();
//     mySpiro.P = mySpiro.calcPoint(angleStep);
//     mySpiro.P.strokeColor = 'yellow';
//     mySpiro.P.strokeWidth = 5;

//     //remove and redraw PCLine
//     mySpiro.PCLine.remove();
//     mySpiro.PCLine = mySpiro.createPCLine(
//         new paper.Point(mySpiro.C.position.x, mySpiro.C.position.y),
//         new paper.Point(mySpiro.P.position.x, mySpiro.P.position.y)
//     );
//     mySpiro.PCLine.strokeColor = 'yellow';
//     mySpiro.PCLine.strokeWidth = 3;
// }



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
