function isImage(message) {
  return Object.keys(message).includes('attachment')
    && Object.keys(message.attachment).includes('type')
    && message.attachment.type === 'image';
}