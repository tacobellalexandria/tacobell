let NUM_OF_PARTICLES = 3; 

let particles = [];


function setup() {
  createCanvas(600, 600);

  // initial particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width/2-5, width/2+5), random(height-50)));
  }
  
  
  
  
}

function draw() {
  background(0);
  
 
 
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
    
  }
 

  // fixing the glitch in particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.display();
    p.update();

    if (p.finished()) {
      // Removing particles that are finished
      particles.splice(i, 1);
    }
  }

  // Logging the number of particles
  console.log("Number of particles: " + particles.length);
}

class Particle {
  
  constructor() {
    this.x = 300;
    this.y = 580; // Start particles higher
    this.dia = 20; // Vary the diameter
    this.spdx = random(-1, 1);
    this.spdy = random(-3,-2); 
    this.opacity = random(150, 200); //opacity for a smokey 
  }
  
  // adding my splice
  finished() {
    return this.opacity < 1;
  }

  update() {
    this.x += this.spdx;
    this.y += this.spdy;
    this.opacity -= 1; // Slowly decrease opacity
  }

  display() {
    // particle's appearance
    push();
    noStroke();
    fill(150, this.opacity); // Gray color with variable opacity
    ellipse(this.x, this.y, this.dia, this.dia);
    pop();
  }
}