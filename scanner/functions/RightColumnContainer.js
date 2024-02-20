function RightColumnContainer() {
  const { state } = useState();
  const getIsToolboxShown = () =>
    state.stepper_state === StepperState.VISUALIZE &&
    state.task !== Tasks.NATURAL_LANGUAGE &&
    !state.stepper_finish;
  return (
    <Row className="toolboxContainer">
      <ToolboxContainer getIsShown={getIsToolboxShown} />
    </Row>
  );
}