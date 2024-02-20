function validateChild(node, key, val) {
  if (val == null) return;
  const validate = _definitions.NODE_PARENT_VALIDATIONS[val.type];
  if (!validate) return;
  validate(node, key, val);
}