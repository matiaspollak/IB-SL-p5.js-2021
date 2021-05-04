/// <reference path="global.d.ts" />
"use strict";

var circles = [];
var squares = [];
var triangles = [];

function preload() {
  //load in images from the data folder
  for (let i = 1; i < 300; i++) {
    circles[i-1] = loadImage("data/circle" + nf(i, 4, 0) + ".png");
    squares[i-1] = loadImage("data/square" + nf(i, 4, 0) + ".png");
    triangles[i-1] = loadImage("data/triangle" + nf(i, 4, 0) + ".png");
  }

}
let shapeClassifier;

function setup() {
  createCanvas(400, 400);
  //background(0);
  //image(squares[0], 0, 0, width, height);

  let options = {
    inputs: [100, 100, 4],
    task: 'imageClassification',
    debug: true
  };
  shapeClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' });
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' });
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' });
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log('finished training!');
  shapeClassifier.save();
}

function draw() {


}

