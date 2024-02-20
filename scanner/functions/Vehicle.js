function Vehicle(x, y, dna) {

  // All the physics stuff
  this.acceleration = createVector();
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3;
  this.maxforce = 0.5;
  this.maxspeed = 3;
  this.velocity.setMag(this.maxspeed);


  // Did it receive DNA to copy?
  if (dna instanceof Array) {
    this.dna = [];
    // Copy all the DNA
    for (var i = 0; i < dna.length; i++) {
      // 10% chance of mutation
      if (random(1) < 0.1) {
        if (i < 2) {
          // Adjust steering force weights
          this.dna[i] = dna[i] + random(-0.2, 0.2);

        } else {
          // Adjust perception radius
          this.dna[i] = dna[i] + random(-10, 10);
        }
        // Copy DNA
      } else {
        this.dna[i] = dna[i];
      }
    }
  } else {
    var maxf = 3;
    // DNA
    // 0: Attraction/Repulsion to food
    // 1: Attraction/Repulsion to poison
    // 2: Radius to sense food
    // 3: Radius to sense poison
    this.dna = [random(-maxf, maxf), random(-maxf, maxf), random(5, 100), random(5, 100)];
  }

  // Health
  this.health = 1;
}