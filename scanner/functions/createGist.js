function createGist(configJson) {
    var data = {
      "description": "Bootstrap Customizer Config",
      "public": true,
      "files": {
        "config.json": {
          "content": configJson
        }
      }
    }
    $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data)
    })
    .success(function(result) {
      history.replaceState(false, document.title, window.location.origin + window.location.pathname + '?id=' + result.id)
    })
    .error(function(err) {
      showError('<strong>Ruh roh!</strong> Could not save gist file, configuration not saved.', err)
    })
  }