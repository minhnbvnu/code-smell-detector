function getCharUnicodeCategory(t){const r=g.get(t);if(r)return r;const o=t.match(d),c={isWhitespace:!(!o||!o[1]),isZeroWidthDiacritic:!(!o||!o[2]),isInvisibleFormatMark:!(!o||!o[3])};g.set(t,c);return c}