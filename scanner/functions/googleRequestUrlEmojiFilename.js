function googleRequestUrlEmojiFilename (combo) {
  return `${googleRequestUrlEmojiPart(
      combo.leftEmoji
  )}_${googleRequestUrlEmojiPart(combo.rightEmoji)}.png`
}