function displayErrorResponse(jqXHR) {
  notify('<div style="max-height:50vh;overflow: scroll;">' + jqXHR.responseText + '</div>');
}