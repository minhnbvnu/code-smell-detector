function encodeOwnerValidationInstruction(instruction) {
  const b = Buffer.alloc(OWNER_VALIDATION_LAYOUT.span);
  const span = OWNER_VALIDATION_LAYOUT.encode(instruction, b);
  return b.slice(0, span);
}