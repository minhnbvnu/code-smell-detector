function decryptionFailed() {
  return (dispatch) => {
    dispatch(error(config.DECRYPTION_FAILED_MESSAGE));

    dispatch(loadDefault());
  };
}