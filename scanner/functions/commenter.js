function commenter(type, index) {
  while (next()) {
    // //
    if (type + character === 47 + 10) break; // /*
    else if (type + character === 42 + 42 && peek() === 47) break;
  }

  return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next());
}