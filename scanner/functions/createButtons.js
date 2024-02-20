function createButtons(buttons, sender) {
  return Map({
    type: MESSAGES_TYPES.BUTTONS,
    component: Buttons,
    text: buttons.text,
    hint: buttons.hint || 'Select an option...',
    quick_replies: fromJS(buttons.quick_replies),
    buttons: fromJS(buttons.buttons),
    sender,
    showAvatar: true,
    chosenReply: null,
    timestamp: new Date().getTime()
  });
}