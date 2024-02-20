function extractTransform(props) {
  var scaleX = props.scaleX != null ? props.scaleX :
               props.scale != null ? props.scale : 1;
  var scaleY = props.scaleY != null ? props.scaleY :
               props.scale != null ? props.scale : 1;

  pooledTransform
    .transformTo(1, 0, 0, 1, 0, 0)
    .move(props.x || 0, props.y || 0)
    .rotate(props.rotation || 0, props.originX, props.originY)
    .scale(scaleX, scaleY, props.originX, props.originY);

  if (props.transform != null) {
    pooledTransform.transform(props.transform);
  }

  return [
    pooledTransform.xx, pooledTransform.yx,
    pooledTransform.xy, pooledTransform.yy,
    pooledTransform.x,  pooledTransform.y,
  ];
}