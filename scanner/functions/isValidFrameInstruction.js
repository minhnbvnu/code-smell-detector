function isValidFrameInstruction(frame) {
  console.assert(typeof frame.cleanType === "string");
  let type = frame.cleanType;
  return (
    INSTR[type] >= 0
  );
}