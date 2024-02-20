function VisualizerNNContainer() {
  const { nn_state, nn_dispatch } = useNNState();
  const nn = new FeedforwardNN(nn_state);
  const [nodes, edges] = toGraph(nn, nn_state.selectedLayerIndex);
  return (
    <Sigma
      graph={{ nodes, edges }}
      style={{
        height: "100%",
        transform: "translate(-50%, -10px)",
      }}
      onClickNode={(event) => onClickNodeFunc(event, nn_dispatch)}
      //onOverNode={this.onOverNodeFunc}
      //onOutNode={this.onOutNodeFunc}
      settings={{
        maxNodeSize: 15,
        maxEdgeSize: 0.3,
        defaultNodeColor: "#777",
        clone: true,
      }}
    >
      <UpdateNodeProps nodes={nodes} edges={edges} />
    </Sigma>
  );

  // return getSigma(g, nn_dispatch);
}