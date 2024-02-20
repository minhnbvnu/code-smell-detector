function updateModel()
  {
    elText.innerHTML = ttModel.contentText ? ttModel.contentText : "";
    elMoreText.innerHTML = ttModel.contentMore ? ttModel.contentMore : "";

    // update animation
    ttModel.animateDuration = options.animateDuration ? options.animateDuration : ttModel.animateDuration;
    ttModel.animateFunction = options.animateFunction ? options.animateFunction : ttModel.animateFunction;
    ttModel.disableAnimation = options.disableAnimation ? options.disableAnimation : ttModel.disableAnimation;
    
    // update color
    ttModel.color = options.color ? options.color : ttModel.color;
    if (html5tooltipsPredefined.color[ttModel.color]) {
      ttModel.color = html5tooltipsPredefined.color[ttModel.color];
      ttModel.color = "rgba(" + ttModel.color.r + ", " + ttModel.color.g + ", " + ttModel.color.b + ", " + ttModel.color.a + ")";
    }
    elBox.style.backgroundColor = ttModel.color;
    elPointer.style.borderColor = ttModel.color;

    // update pointer
    ttElement.className = template.hookClasses.tooltip + "-" + ttModel.stickTo;

    if (document.body && ttElement.parentNode !== document.body)
      document.body.appendChild(ttElement);
  }