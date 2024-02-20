function googleRequestUrlEmojiPart (emoji) {
  return emoji
    .split('-')
    .map((part) => `u${part.toLowerCase()}`)
    .join('-')
}