function charFontStyle(char) {
  let attrs = char.attributes
  if(!attrs) return 'regular'

  let bold = false
  let italic = false

  if(!_.isUndefined(attrs[ATTR.BOLD])) bold = attrs[ATTR.BOLD]
  if(!_.isUndefined(attrs[ATTR.ITALIC])) italic = attrs[ATTR.ITALIC]

  if(bold && italic) return 'boldItalic'
  else if(bold) return 'bold'
  else if(italic) return 'italic'
  else return 'regular'
}