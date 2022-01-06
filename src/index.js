console.log("Hello World");
import paper from "paper";

// Set up canvas
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

//set up circles
var outerDia = 260;
var circles = [];
for (let i = 0; i <4; i++) {
    circles.push(new paper.Path.Circle(paper.view.center, outerDia - 60*i));
}
circles[0].fillColor = 'red';
circles[1].fillColor = 'white';
circles[2].fillColor = 'red';
circles[3].fillColor = 'blue';

//set up star
var star = new paper.Path.Star(paper.view.center, 5, outerDia-60*3, outerDia-60*3.8);
star.fillColor = 'white';
