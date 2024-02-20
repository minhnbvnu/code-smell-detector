function SliderRose(_x, _y){
  this.x1 = _x;
  this.y1 = _y;
  // collect the sliders in an array
  var sliders = [];
  var sinAngle = 0;
  // create a counter to index the sliders
  var counter = 0;
  // set the slider width
  var roseRadius = random(20, 100);
  // define how many degrees to skip from 360
  var skip = 20;
  // create sliders around a circle
  for (var i = 0; i < 360; i += skip){
    var sliderAngle = radians(i);
    var x2 = cos(sliderAngle) * roseRadius;
    var y2 = sin(sliderAngle) * roseRadius;
    // create the slider, position, and rotate
    sliders[counter] = createSlider(0, 255, 50);
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style('width', roseRadius + 'px');
    sliders[counter].style('transform', 'rotate(' + i + 'deg)');
    counter++;

  }

  // for each loop through the draw function
  // update the sliders according to a sin wave
  this.update = function(){
    var offset = 0;
    for (var i = 0; i < sliders.length; i++){
      // map the value along the sine wave to the slider values
      var x = map(sin(sinAngle + offset), -1, 1, 0, 255);
      sliders[i].value(x);
      offset += 0.050;
    }
    sinAngle += 0.1;
  };

}