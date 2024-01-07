function ResultPopover(props) {
  return (
    <pre
      css={{
        padding: '1em',
        minWidth: '25em',
      }}>
      {JSON.stringify(
        {
          reactStable: props.reactStable,
          reactNext: props.reactNext,
          hasSameBehavior: props.hasSameBehavior,
        },
        null,
        2
      )}
    </pre>
  );
}