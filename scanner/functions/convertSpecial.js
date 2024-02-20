function convertSpecial(context, node) {
    return ['buffer', specialChars[node[1]]];
  }