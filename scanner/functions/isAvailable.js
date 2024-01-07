function isAvailable(fontStyle, fontWeight, fontFamily) {
    let available = true;
    for (let i = 0; i < len; ++i) {
      const referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(
        fontStyle + ' ' + fontWeight + ' ' + size + referenceFont,
        text,
      );
      if (fontFamily != referenceFont) {
        const width = measureTextWidth(
          fontStyle +
            ' ' +
            fontWeight +
            ' ' +
            size +
            fontFamily +
            ',' +
            referenceFont,
          text,
        );
        // If width and referenceWidth are the same, then the fallback was used
        // instead of the font we wanted, so the font is not available.
        available = available && width != referenceWidth;
      }
    }
    if (available) {
      return true;
    }
    return false;
  }