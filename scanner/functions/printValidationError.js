function printValidationError(msgType, err, msg, args) {
  if (msg && displayType(msgType, args)) {
    // TODO(jlisee): look into ajv-errors package to simplify this output
    const msgStr = indentString(JSON.stringify(msg, null, 4), 4);
    const errStr = indentString(err.toString(), 4);
    console.log(`VALIDATION ERROR:\n  TYPE: ${msgType}\n  DETAILS:\n${errStr}\n  MSG:\n${msgStr}`);
  }
}