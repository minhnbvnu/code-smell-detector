function instrisicFunctionIndex(prop) {
  switch (prop) {
    case "Fn::GetAtt":
      return 0;
    case "Fn::Join":
      return 1;
  }
  return 0;
}