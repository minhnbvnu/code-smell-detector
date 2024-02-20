function pointInEllipse(a,b,theta,t) {
  const x = a * Math.cos(t*Maf.TAU) * Math.cos(theta) - b * Math.sin(t*Maf.TAU) * Math.sin(theta);
  const y = a * Math.cos(t*Maf.TAU) * Math.sin(theta) + b * Math.sin(t*Maf.TAU) * Math.cos(theta);
  return {x,y}
}