function appendOperand(o, args, escaper) {
  if (o.type === "column") {
    appendSql(escaper(o.value), args);
  } else {
    args.push(o.value);
    args[0].push("");
  }
}