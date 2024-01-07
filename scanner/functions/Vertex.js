function Vertex(props) {
  if (Number.isNaN(props.x) || Number.isNaN(props.y)) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        border: '1px solid black',
        left: props.x - props.width / 2,
        top: props.y - props.height / 2,
        width: props.width,
        height: props.height,
        overflow: 'hidden',
        padding: '4px',
        wordWrap: 'break-word',
      }}>
      {props.children}
    </div>
  );
}