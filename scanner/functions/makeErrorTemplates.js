function makeErrorTemplates(messages, code) {
  const templates = {};
  Object.keys(messages).forEach(reasonCode => {
    templates[reasonCode] = Object.freeze({
      code,
      reasonCode,
      template: messages[reasonCode]
    });
  });
  return Object.freeze(templates);
}