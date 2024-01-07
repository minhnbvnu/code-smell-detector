function rotate(transform, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}