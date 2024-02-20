function JSONC2JSON(jsonc) {
  return stripJsonComments(jsonc).replace(constants["M" /* REG */].WHITESPACE, constants["u" /* EMPTY_STRING */]).replace(constants["M" /* REG */].TRIM_JSON, function ($0, $1, $2) {
    return $2;
  });
}