function isVideo(message) {
  return Object.keys(message).includes('attachment')
    && Object.keys(message.attachment).includes('type')
    && message.attachment.type === 'video';
}