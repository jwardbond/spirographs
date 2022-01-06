console.log("Hello World");
// import * as THREE from "three";
import paper from "paper";

window.onload = function() {

    console.log("Here")
    // Get a reference to the canvas object
    var canvas = document.getElementById('myCanvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    // Create a Paper.js Path to draw a line into it:
    var path = new paper.Path();
    // Give the stroke a color
    path.strokeColor = 'white';
    var start = new paper.Point(100, 100);
    // Move to start and draw a line from there
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([ 200, -50 ]));
    // Draw the view now:
    paper.view.draw();
}

// // // Scene
// const scene = new THREE.Scene();

// // Add a cube to the scene
// const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
// const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0, 0, 0);
// scene.add(mesh);

// // Set up lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
// directionalLight.position.set(10, 20, 0); // x, y, z
// scene.add(directionalLight);

// // Camera
// const width = 10;
// const height = width * (window.innerHeight / window.innerWidth);
// const camera = new THREE.OrthographicCamera(
//   width / -2, // left
//   width / 2, // right
//   height / 2, // top
//   height / -2, // bottom
//   1, // near
//   100 // far
// );

// camera.position.set(4, 4, 4);
// camera.lookAt(0, 0, 0);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);

// // Add it to HTML
// document.body.appendChild(renderer.domElement);