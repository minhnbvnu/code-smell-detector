function main_loop() {
  updateSim();
  drawSim();
  userCanvasManip=false; // may be set=true by some method
                        // during updateSim/drawSim
}