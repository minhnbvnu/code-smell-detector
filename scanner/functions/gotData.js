function gotData(data) {
  console.log(data);

  // Draw the name when it comes back in the canvas
  var name = data.name;
  var x = random(width);
  var y = random(height);
  fill(255);
  noStroke();
  text(name, x, y);
}