function generateNodeProps(longestChain) {
  return function({ node, path }) {
    const addBlock = () => {
      this.addBlockFrom(node);
      advanceTo(3);
    };
    const normalButton = (
      <Button key="add" text="Add block from here" onClick={addBlock} />
    );
    const isMaxHeightBlock = last(longestChain).hash === node.hash;

    return {
      buttons: [
        <Button
          key="detail"
          iconName="pt-icon-database"
          onClick={this.showBlock(node)}
        />,
        isMaxHeightBlock ? (
          <Tooltip
            content={
              <p style={{ maxWidth: "250px" }}>
                Mining blocks means adding blocks to another parent block by
                pointing to it in the block header. Unless someone else gives
                you coins, mining is the only way for you to get coins, so let's
                start here.
              </p>
            }
            next={addBlock}
            nextLabel="Start mining!"
            step={2}
          >
            {normalButton}
          </Tooltip>
        ) : (
          normalButton
        )
      ],
      node: {
        title: `Block ${node.hash.substr(0, 10)}`,
        subtitle: `Height ${node.height}`,
        expanded: true
      },
      className: pipe(pluck("hash"), contains(node.hash))(longestChain)
        ? "partOfLongestChain"
        : ""
    };
  };
}