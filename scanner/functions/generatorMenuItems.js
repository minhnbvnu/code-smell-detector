function generatorMenuItems(emojiJson, commandName) {
  return Object.keys(emojiJson).map((emojiType) => ({
    name: emojiType,
    text: emojiJson[emojiType],
    class: 'v-md-emoji-panel-item',
    action(editor) {
      editor.execCommand(commandName, emojiType);
    },
  }));
}