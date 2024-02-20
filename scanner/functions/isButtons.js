function isButtons(message) {
  return Object.keys(message).length === 2
    && Object.keys(message).includes('text')
    && (Object.keys(message).includes('quick_replies') || Object.keys(message).includes('buttons'));
}