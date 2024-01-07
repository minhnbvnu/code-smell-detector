function includesType(broad, specific) {
  return (broad & specific) === specific;
}