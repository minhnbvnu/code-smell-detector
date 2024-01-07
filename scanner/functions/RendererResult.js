function RendererResult({
  result,
  canonicalResult,
  defaultValue,
  canonicalDefaultValue,
  didWarn,
  didError,
  ssrHasSameBehavior,
  ssrHasSameBehaviorExceptWarnings,
}) {
  let backgroundColor;
  if (didError) {
    backgroundColor = errorColor;
  } else if (didWarn) {
    backgroundColor = warnColor;
  } else if (canonicalResult !== canonicalDefaultValue) {
    backgroundColor = 'cyan';
  } else {
    backgroundColor = successColor;
  }

  let style = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor,
  };

  if (!ssrHasSameBehavior) {
    const color = ssrHasSameBehaviorExceptWarnings ? 'gray' : 'magenta';
    style.border = `3px dotted ${color}`;
  }

  return <div css={style}>{canonicalResult}</div>;
}