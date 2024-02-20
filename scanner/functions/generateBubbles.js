function generateBubbles(num,speedMin,speedMax) {
  const bubbles = [];
  for (let j=0; j<num; j++) {
    bubbles.push({
      x: Maf.randomInRange(-1,1),
      y: Maf.randomInRange(-1,1),
      size: Maf.randomInRange(0,1),
      speed: Maf.randomInRange(.5,1.5)
    })
  }
  return bubbles;
}