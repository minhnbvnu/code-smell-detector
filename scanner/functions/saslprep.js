function saslprep(input, opts = {}) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected string.');
  }

  if (input.length === 0) {
    return '';
  }

  // 1. Map
  const mapped_input = toCodePoints(input)
    // 1.1 mapping to space
    .map(character => (mapping2space(character) ? 0x20 : character))
    // 1.2 mapping to nothing
    .filter(character => !mapping2nothing(character));

  // 2. Normalize
  const normalized_input = String.fromCodePoint
    .apply(null, mapped_input)
    .normalize('NFKC');

  const normalized_map = toCodePoints(normalized_input);

  // 3. Prohibit
  const hasProhibited = normalized_map.some(isProhibitedCharacter);

  if (hasProhibited) {
    throw new Error(
      'Prohibited character, see https://tools.ietf.org/html/rfc4013#section-2.3'
    );
  }

  // Unassigned Code Points
  if (opts.allowUnassigned !== true) {
    const hasUnassigned = normalized_map.some(isUnassignedCodePoint);

    if (hasUnassigned) {
      throw new Error(
        'Unassigned code point, see https://tools.ietf.org/html/rfc4013#section-2.5'
      );
    }
  }

  // 4. check bidi

  const hasBidiRAL = normalized_map.some(isBidirectionalRAL);

  const hasBidiL = normalized_map.some(isBidirectionalL);

  // 4.1 If a string contains any RandALCat character, the string MUST NOT
  // contain any LCat character.
  if (hasBidiRAL && hasBidiL) {
    throw new Error(
      'String must not contain RandALCat and LCat at the same time,' +
        ' see https://tools.ietf.org/html/rfc3454#section-6'
    );
  }

  /**
   * 4.2 If a string contains any RandALCat character, a RandALCat
   * character MUST be the first character of the string, and a
   * RandALCat character MUST be the last character of the string.
   */

  const isFirstBidiRAL = isBidirectionalRAL(
    getCodePoint(first(normalized_input))
  );
  const isLastBidiRAL = isBidirectionalRAL(
    getCodePoint(last(normalized_input))
  );

  if (hasBidiRAL && !(isFirstBidiRAL && isLastBidiRAL)) {
    throw new Error(
      'Bidirectional RandALCat character must be the first and the last' +
        ' character of the string, see https://tools.ietf.org/html/rfc3454#section-6'
    );
  }

  return normalized_input;
}