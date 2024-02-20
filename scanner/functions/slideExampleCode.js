function slideExampleCode(event) {
  event.preventDefault();

  var slide = event.target.parentElement.nextElementSibling;
  slide.classList.toggle('open');

  if (slide.classList.contains('open')) {
    // open the example code
    slide.style.maxHeight = slide.scrollHeight + 'px';
  } else {
    // close the example code
    slide.style.maxHeight = 0;
  }
}