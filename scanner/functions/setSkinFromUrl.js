function setSkinFromUrl(url) {
  return async dispatch => {
    dispatch({
      type: LOADING
    });

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      dispatch(setSkinFromBlob(response.blob()));
    } catch (e) {
      console.error(e);
      dispatch({
        type: LOADED
      });
      alert(`Failed to download skin from ${url}`);
    }
  };
}