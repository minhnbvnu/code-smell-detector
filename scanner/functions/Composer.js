function Composer(props) {
  return renderRecursive(props.children, props.components);
}