let img;
//let thePlace;
let places= [];

function preload() {
  img = loadImage("images/easter island/EAIsland.jpg");
  places.push( new Place(282,136, 'images/easter island/vulcan.jpg'));
  places.push( new Place(124,365, 'images/easter island/hangaroa.jpg' ))
  places.push( new Place(309,426, 'images/easter island/vaihu.jpg' ));
  places.push( new Place(413,362, 'images/easter island/oroi.jpg' ));
  places.push( new Place(512,312,'images/easter island/hatuhi.jpg'));
  places.push( new Place(672,252,'images/easter island/poike.jpg'));
}

function setup() {
  createCanvas(1500, 1000);
  //image(img, 0, 0, 800, 600);
  
  //thePlace = new Place(width/2, height/2);
  //thePlace2= new Place(282, 136);
  //thePlace3= new Place (111,363);
  
//  places.push( new Place(282,136, 'oroi.jpg'));
 // places.push( new Place(124,365, 'oroi.jpg'));
 // places.push( new Place(309,426, 'oroi.jpg'));
 // places.push( new Place(413,362, 'oroi.jpg'));
 // places.push( new Place(512,312,'oroi.jpg'));
 // places.push( new Place(672,252,'oroi.jpg'));
}

function draw() {
  background('white');
  image(img, 0, 0, 800, 600);
  
  
  for(let i=0; i< places.length; i++){
    places[i].display();
  }
  
  
}

function mouseClicked(){
  console.log(mouseX+", "+mouseY);
  
  for (let i=0; i<places.length; i++){
    let p= places[i];
    if(p.canclick == true ){
      p.drawimage= true;
      //break;
    }else{
      p.drawimage=false;
    }
  }
}

class Place {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    //radius value below
    this.r = 50;
    this.canclick = false;
    this.img= loadImage(img);
    this.drawimage=false;
   // this.text= text;
  }

  hover() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.r) {
      //
      this.canclick = true;
    } else {
      this.canclick= false;
    }
  }
  
  display(){
    this.hover();
    
    if (this.canclick==true){
      fill(255,0,0,80);
      circle(this.x,this.y,this.r);
    }else{
      fill(255);
      circle(this.x,this.y,this.r/2);
    }
    
    if( this.drawimage==false){
      
    }else{
      this.pic();
    }
    //displaying text
    
  }
  
  pic(){
    
    image(this.img, this.x+50, this.y-50, 300,200);
  }
}
