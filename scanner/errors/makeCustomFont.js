                                            .map((range) =>
                                                Array.from(Array(range.end - range.start + 1)).map(
                                                    (_, index) => range.start + index
                                                )
                                    glyphs.forEach((glyphIndexOriginal, index) => {
                                        //
                                        // glyphIndexOriginal is the index of the original glyph
                                        // glyphIndexSubstitute is the index of the glyph to substitute the original with
                                        const glyphIndexSubstitute = subtable.substitute[index]

                                        // get the paths for the original and the substitute glyph
                                        const glyphPathOriginal = font.glyphs.glyphs[glyphIndexOriginal].path
                                        const glyphPathSubstitute = font.glyphs.glyphs[glyphIndexSubstitute].path

                                        // swap the paths, so the original glyph gets the path of the substitute and vice versa
                                        font.glyphs.glyphs[glyphIndexOriginal].path = glyphPathSubstitute
                                        font.glyphs.glyphs[glyphIndexSubstitute].path = glyphPathOriginal
                                    })