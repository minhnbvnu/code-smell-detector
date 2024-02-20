function _modeStringToNumber(modeString) {
  const MAPPING = {
    'mode/1up': 1,
    'mode/2up': 2,
    'mode/thumb': 3,
  };

  if (!(modeString in MAPPING)) {
    throw new OptionsParseError(`Invalid mode string: ${modeString}`);
  }

  return MAPPING[modeString];
}