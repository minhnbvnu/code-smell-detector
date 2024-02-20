function load_resource(method, path, data, on_success, on_error, on_progress) {
  var req = new XMLHttpRequest();
  req.onload = function(evt,b,c) {
    if (req.status>=200 && req.status<=299) {
      var parsed = null;
      
      try {
        var parsed = JSON.parse(req.response);
      } catch(e) {};

      if (data && parsed && parsed._id) {
        // mutate the local object and update its _id
        data._id = parsed._id;
      }
      if (on_success) {
        on_success(parsed,req);
      }
    } else {
      if (on_error) {
        on_error(req);
      }
    }
  };

  req.onerror = function(err) {
    console.log(err,err.target);
    // window._spacedeck_location_change is a flag set by redirect / reload functions
    if (!window._spacedeck_location_change) {
      if (window.spacedeck && window.spacedeck.active_space) {
        window.spacedeck.offline = true;
      } else {
        alert("Could not connect to Spacedeck. Please reconnect and try again.");
      }
    }
    if (on_error) on_error(req);
  }

  req.withCredentials = true;
  req.open(method, api_endpoint+"/api"+path, true);

  if (api_token) {
    req.setRequestHeader("X-Spacedeck-Auth", api_token);
  }
  if (space_auth) {
    req.setRequestHeader("X-Spacedeck-Space-Auth", space_auth);
  }
  if (channel_id) {
    req.setRequestHeader("X-Spacedeck-Channel", channel_id);
  }

  try {
    if (data) {
      if (data.toString() == "[object File]") {
        req.setRequestHeader("Content-type", data.type);
        req.setRequestHeader("Accepts", "application/json");
        req.upload.onprogress = function(e) {
          console.log("upload progress: ",e.loaded,e.total);
          if (on_progress) on_progress(e);
        }
        req.send(data);
      } else {
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(data));
      }
    } else {
      req.send();
    }
  } catch (e) {
    if (on_error) {
      on_error(req, e);
    } else {
      throw(e);
    }
  }
}