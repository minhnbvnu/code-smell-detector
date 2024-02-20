async function initializeWidget(state) {
  deleteMessages();
  await new Promise((r) => setTimeout(r, 2500));
  convo.sayMessages(msgs.IntroQuestion(), state.stepper_state);
}