function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    var data = file.data;
    classify(data);
    // Create an image DOM element but don't show it
    img = createImg(data, ready);

    function ready() {
      img.hide();
      background(0);
      image(img, 0, 0, width, height);
    }
    // Draw the image onto the canvas
  } else {
    console.log('Not an image file!');
  }
}