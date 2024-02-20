function normalizeOperator(operator) {
  switch (operator) {
    case "above":
      return "above";
    case "below":
      return "below";
    case "left-of":
    case "leftOf":
      return "leftOf";
    case "right-of":
    case "rightOf":
      return "rightOf";
    case "align-top":
    case "alignTop":
      return "alignTop";
    case "align-bottom":
    case "alignBottom":
      return "alignBottom";
    case "align-left":
    case "alignLeft":
      return "alignLeft";
    case "align-right":
    case "alignRight":
      return "alignRight";
    case "align-parent-top":
    case "alignParentTop":
      return "alignParentTop";
    case "align-parent-bottom":
    case "alignParentBottom":
      return "alignParentBottom";
    case "align-parent-left":
    case "alignParentLeft":
      return "alignParentLeft";
    case "align-parent-right":
    case "alignParentRight":
      return "alignParentRight";
    case "center-horizontal":
    case "centerHorizontal":
      return "centerHorizontal";
    case "center-vertical":
    case "centerVertical":
      return "centerVertical";
    default:
      return null;
  }
}