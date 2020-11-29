console.clear();

class RotateEllipse{
  constructor(){
    this.DOM = {
      roundedEllipse: document.querySelector(".rounded_ellipse")
    }
        
    this.animation = (time) => gsap.to(
      this.DOM.roundedEllipse.querySelector("svg"), 
      { 
        rotation: 360,
        duration: time,
        ease: "linear", 
        repeat: -1,
        paused: true
      }
    );

    this.init();
    this.events();
  }
  
  init(){
    this.animation(5).play();
  }
 
  events(){ 
    this.DOM.roundedEllipse.addEventListener("mouseenter", () => this.animation(1).play());
    this.DOM.roundedEllipse.addEventListener("mouseleave", () => this.animation(5).play());
  }
}

new RotateEllipse();