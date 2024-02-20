function milkdrop_scheduleMilkdropMessage(message) {
  return {
    type: SCHEDULE_MILKDROP_MESSAGE,
    message
  };
}