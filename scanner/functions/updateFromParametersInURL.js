function updateFromParametersInURL() {
  var paramsJSON = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (paramsJSON) {
    try {
      var params = JSON.parse(paramsJSON);
      if (typeof params !== "object") {
        alert("Invalid URL parameter JSON: top level value must be an object");
        params = null;
      }
    } catch (error) {
      alert("Invalid URL parameter JSON syntax\n\n" + error + "\n\nRecieved:\n" + paramsJSON);
    }
  }
  params = params || {};

  // update based on the parameters
  // TODO: support more options
  showElementsIf(".ui-container", !params.hideUI);
}