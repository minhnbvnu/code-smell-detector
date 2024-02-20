function reserveTempVarId() {
  return (
    `${TEMP_VAR_BASE}${utvidx++}`
  );
}