function updateLocalStorage(data) {
  if(window.localStorage !== null) {
    window.localStorage.setItem("codehouse-collections", null);
    window.localStorage.setItem("codehouse-collections", JSON.stringify(data));
  }
}