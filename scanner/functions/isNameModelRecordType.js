function isNameModelRecordType(modelRecord) {
  return (
    isObjectHasLength(modelRecord) &&
    Object.values(modelRecord).find((value) => {
      return (
        value.model &&
        isStringHasLength(value.model.entity) &&
        isStringHasLength(value.model.version) &&
        isStringHasLength(value.model.service)
      );
    })
  );
}