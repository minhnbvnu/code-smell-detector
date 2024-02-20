function gradientBoundingBox(gradient) {
  var gradientObj = element_object(gradient);
  if (!gradientObj) return null;

  if (/^linearGradient$/i.test(gradientObj.type)) return linearGradientBoundingBox(gradientObj);else if (/^radialGradient$/i.test(gradientObj.type)) return radialGradientBoundingBox(gradientObj);else return null;
}