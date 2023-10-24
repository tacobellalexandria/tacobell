// based on ml5.s PoseNet Webcam example as the external library

//establishing my gloabl variables below 
let video;
let poseNet;
let poses = [];

let startX;
let endX;
let rightY;
let leftY;

let keypoint; 

function setup() {
  createCanvas(640, 480);

  //video = createCapture(VIDEO);
  video.size(width, height);

  //the external library I used: poseNet
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotResults);
}

function modelReady() {
  console.log("Model ready");
}

//callback function that produces results based on pose AKA an automatic call that executes when the pose is ready
function gotResults(results) {
  //results is an object, poses is an array of objects
  poses = results;
  console.log(results);
}

function draw() {
  background(10);
  //image(video, 0, 0, width, height);
  console.log(keypoint); 
  //drawLife();

  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
  //drawSkeleton();

  //embedded for loop with if statesments that draw the circles based on the accuracy detected of my pose keypoints
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        if (!circle[j]) {
          circle[j] = {
            x: keypoint.position.x,
            y: keypoint.position.y,
            
          };
        }
        fill(16, 96, 224, 90);
        noStroke();
        ellipse(circle[j].x, circle[j].y, 20, 20);

     
        if (keypoint.score > 0.2) {
          fill(16, 96, 224, 80);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
          push();
          fill(16, 96, 224, 75);
          ellipse(keypoint.position.x, keypoint.position.y, 50, 40, 60);
          pop();
        }
      }
    }

    //embedded for loop that draws the circles specific to right and left wrist
    if (poses.length > 0) {
      let rightWrist;
      //with some user testing might want to change this number
      if (poses[0].pose.rightWrist.confidence >= 0.2) {
        rightWrist = poses[0].pose.rightWrist;
        noStroke();
        fill(16, 96, 224, 80);
        ellipse(rightWrist.x, rightWrist.y - 100, 100, 100);
        push();
        fill(16, 96, 224, 65);
        circle(rightWrist.x, rightWrist.y - 100, 75);
        pop();
        push();
        fill(201, 240, 10, 90);
        circle(rightWrist.x, rightWrist.y - 100, 60);
        pop();
      }

      if (poses.length > 0) {
        let leftWrist;
        if (poses[0].pose.leftWrist.confidence >= 0.2) {
          leftWrist = poses[0].pose.leftWrist;
          noStroke();
          fill(16, 96, 224, 80);
          ellipse(leftWrist.x, leftWrist.y - 100, 100, 100);
          push();
          fill(16, 96, 224, 65);
          circle(leftWrist.x, leftWrist.y - 100, 75);
          pop();
          push();
          fill(201, 240, 10, 90);
          circle(leftWrist.x, leftWrist.y - 100, 60);
          pop();
        }
      }
    }
  }
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);

      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
