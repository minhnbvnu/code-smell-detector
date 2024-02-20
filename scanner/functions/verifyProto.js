function verifyProto(t, protoType, jsonExample, msg) {
  const err = protoType.verify(jsonExample);
  if (err) {
    t.fail(`${msg}: ${err}, example: ${JSON.stringify(jsonExample, '', 4)}`);
  } else {
    t.pass(msg);
  }
}