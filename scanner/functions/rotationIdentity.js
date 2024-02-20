function rotationIdentity(lambda, phi) {
  if (abs(lambda) > pi) lambda -= Math.round(lambda / tau) * tau;
  return [lambda, phi];
}