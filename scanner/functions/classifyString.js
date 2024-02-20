function classifyString([str]) {
  return classify(str).replace(/\//g, '::');
}