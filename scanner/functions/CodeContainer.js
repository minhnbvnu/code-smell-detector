function CodeContainer({ getIsShown }) {
  const { state } = useState();
  const { nn_state } = useNNState();
  const {model_state} = useModelState();

  return (
    <Grow in={getIsShown()}>
      <div
        className={state.stepper_finish ? "codeOverflowFinish" : "codeOverflow"}
      >
        <SyntaxHighlighter language="python" style={monokaiSublime}>
          {CodeGen(state, nn_state, model_state)}
        </SyntaxHighlighter>
      </div>
    </Grow>
  );
}