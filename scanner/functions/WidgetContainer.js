function WidgetContainer() {
  const { state, dispatch } = useState();
  convo.state = state;
  const { nn_state, nn_dispatch } = useNNState();

  useEffect(() => {
    toggleWidget();
    initializeWidget(state);
  }, []);

  const handleSubmit = async (userMessage) => {
    const stepperStateOriginal = state.stepper_state;
    const msgs = await convo.handleUserMessage(
      userMessage,
      state,
      dispatch,
      nn_state,
      nn_dispatch
    );
    convo.sayMessages(msgs, stepperStateOriginal);
  };

  return (
    <Widget
      handleSubmit={handleSubmit}
      subtitle=""
      title="Otto"
      titleAvatar={logo}
      showTimeStamp={false}
      //profileAvatar={logo}
    />
  );
}