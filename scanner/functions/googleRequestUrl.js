function googleRequestUrl (combo) {
  return `${Config.emojiBaseURL}/${combo.date}/${googleRequestUrlEmojiPart(
      combo.leftEmoji
  )}/${googleRequestUrlEmojiFilename(combo)}`
}