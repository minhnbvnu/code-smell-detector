function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}