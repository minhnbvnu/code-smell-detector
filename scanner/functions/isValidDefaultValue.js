function isValidDefaultValue (type, defaultVal) {
  if (type === 'audio' && typeof defaultVal !== 'string') { return false; }
  if (type === 'array' && !Array.isArray(defaultVal)) { return false; }
  if (type === 'asset' && typeof defaultVal !== 'string') { return false; }
  if (type === 'boolean' && typeof defaultVal !== 'boolean') { return false; }
  if (type === 'color' && typeof defaultVal !== 'string') { return false; }
  if (type === 'int' && typeof defaultVal !== 'number') { return false; }
  if (type === 'number' && typeof defaultVal !== 'number') { return false; }
  if (type === 'map' && typeof defaultVal !== 'string') { return false; }
  if (type === 'model' && typeof defaultVal !== 'string') { return false; }
  if (type === 'selector' && typeof defaultVal !== 'string' &&
      defaultVal !== null) { return false; }
  if (type === 'selectorAll' && typeof defaultVal !== 'string' &&
      defaultVal !== null) { return false; }
  if (type === 'src' && typeof defaultVal !== 'string') { return false; }
  if (type === 'string' && typeof defaultVal !== 'string') { return false; }
  if (type === 'time' && typeof defaultVal !== 'number') { return false; }
  if (type === 'vec2') { return isValidDefaultCoordinate(defaultVal, 2); }
  if (type === 'vec3') { return isValidDefaultCoordinate(defaultVal, 3); }
  if (type === 'vec4') { return isValidDefaultCoordinate(defaultVal, 4); }
  return true;
}