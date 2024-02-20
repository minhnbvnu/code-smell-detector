function findDownstreamErrorCatchersForOutput(tNodeOutput) {
    return R.compose(
      R.chain(downStreamNodeId => {
        const downstreamTNode = tNodesById[downStreamNodeId];

        return downstreamTNode.patch.catchesErrors
          ? [downstreamTNode.id]
          : R.chain(
              findDownstreamErrorCatchersForOutput,
              downstreamTNode.outputs
            );
      }),
      R.map(R.prop('id')),
      R.propOr([], 'to')
    )(tNodeOutput);
  }