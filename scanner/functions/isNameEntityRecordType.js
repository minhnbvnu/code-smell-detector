function isNameEntityRecordType(entityRecord) {
  return (
    isObjectHasLength(entityRecord) &&
    Object.values(entityRecord).find((value) => {
      return value._instance !== undefined;
    })
  );
}