function CouchDB(name, httpHeaders) {
  this.name = name;
  this.uri = "/" + encodeURIComponent(name) + "/";
  
  // The XMLHttpRequest object from the most recent request. Callers can
  // use this to check result http status and headers.
  this.last_req = null;
  
  this.request = function(method, uri, requestOptions) {
      requestOptions = requestOptions || {}
      requestOptions.headers = combine(requestOptions.headers, httpHeaders)
      return CouchDB.request(method, uri, requestOptions);
    }

  // Creates the database on the server
  this.createDb = function() {
    this.last_req = this.request("PUT", this.uri);
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  // Deletes the database on the server
  this.deleteDb = function() {
    this.last_req = this.request("DELETE", this.uri);
    if (this.last_req.status == 404)
      return false;
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  // Save a document to the database
  this.save = function(doc, options) {
    if (doc._id == undefined)
      doc._id = CouchDB.newUuids(1)[0];

    this.last_req = this.request("PUT", this.uri  + 
        encodeURIComponent(doc._id) + encodeOptions(options),
        {body: JSON.stringify(doc)});
    CouchDB.maybeThrowError(this.last_req);
    var result = JSON.parse(this.last_req.responseText);
    doc._rev = result.rev;
    return result;
  }

  // Open a document from the database
  this.open = function(docId, options) {
    this.last_req = this.request("GET", this.uri + encodeURIComponent(docId) + encodeOptions(options));
    if (this.last_req.status == 404)
      return null;
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  // Deletes a document from the database
  this.deleteDoc = function(doc) {
    this.last_req = this.request("DELETE", this.uri + encodeURIComponent(doc._id) + "?rev=" + doc._rev);
    CouchDB.maybeThrowError(this.last_req);
    var result = JSON.parse(this.last_req.responseText);
    doc._rev = result.rev; //record rev in input document
    doc._deleted = true;
    return result;
  }

  // Deletes an attachment from a document
  this.deleteDocAttachment = function(doc, attachment_name) {
    this.last_req = this.request("DELETE", this.uri + encodeURIComponent(doc._id) + "/" + attachment_name + "?rev=" + doc._rev);
    CouchDB.maybeThrowError(this.last_req);
    var result = JSON.parse(this.last_req.responseText);
    doc._rev = result.rev; //record rev in input document
    return result;
  }
  
  this.bulkSave = function(docs, options) {
    // first prepoulate the UUIDs for new documents
    var newCount = 0
    for (var i=0; i<docs.length; i++) {
      if (docs[i]._id == undefined)
        newCount++;
    }
    var newUuids = CouchDB.newUuids(docs.length);
    var newCount = 0
    for (var i=0; i<docs.length; i++) {
      if (docs[i]._id == undefined)
        docs[i]._id = newUuids.pop();
    }
    var json = {"docs": docs};
    // put any options in the json
    for (var option in options) {
      json[option] = options[option];
    }
    this.last_req = this.request("POST", this.uri + "_bulk_docs", {
      body: JSON.stringify(json)
    });
    if (this.last_req.status == 417) {
      return {errors: JSON.parse(this.last_req.responseText)};
    }
    else {
      CouchDB.maybeThrowError(this.last_req);
      var results = JSON.parse(this.last_req.responseText);
      for (var i = 0; i < docs.length; i++) {
        if(results[i].rev)
          docs[i]._rev = results[i].rev;
      }
      return results;
    }
  }
  
  this.ensureFullCommit = function() {
    this.last_req = this.request("POST", this.uri + "_ensure_full_commit");
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  // Applies the map function to the contents of database and returns the results.
  this.query = function(mapFun, reduceFun, options, keys) {
    var body = {language: "javascript"};
    if(keys) {
      body.keys = keys ;      
    }
    if (typeof(mapFun) != "string")
      mapFun = mapFun.toSource ? mapFun.toSource() : "(" + mapFun.toString() + ")";
    body.map = mapFun;
    if (reduceFun != null) {
      if (typeof(reduceFun) != "string")
        reduceFun = reduceFun.toSource ? reduceFun.toSource() : "(" + reduceFun.toString() + ")";
      body.reduce = reduceFun;
    }
    if (options && options.options != undefined) {
        body.options = options.options;
        delete options.options;
    }
    this.last_req = this.request("POST", this.uri + "_temp_view" + encodeOptions(options), {
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  this.view = function(viewname, options, keys) {
    var viewParts = viewname.split('/');
    var viewPath = this.uri + "_design/" + viewParts[0] + "/_view/" 
        + viewParts[1] + encodeOptions(options);
    if(!keys) {
      this.last_req = this.request("GET", viewPath);      
    } else {
      this.last_req = this.request("POST", viewPath, {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({keys:keys})
      });      
    }
    if (this.last_req.status == 404)
      return null;
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  // gets information about the database
  this.info = function() {
    this.last_req = this.request("GET", this.uri);
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }

  this.allDocs = function(options,keys) {
    if(!keys) {
      this.last_req = this.request("GET", this.uri + "_all_docs" + encodeOptions(options));      
    } else {
      this.last_req = this.request("POST", this.uri + "_all_docs" + encodeOptions(options), {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({keys:keys})
      });      
    }
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  this.designDocs = function() {
    return this.allDocs({startkey:"_design", endkey:"_design0"});
  };

  this.allDocsBySeq = function(options,keys) {
    var req = null;
    if(!keys) {
      req = this.request("GET", this.uri + "_all_docs_by_seq" + encodeOptions(options));      
    } else {
      req = this.request("POST", this.uri + "_all_docs_by_seq" + encodeOptions(options), {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({keys:keys})
      });      
    }
    CouchDB.maybeThrowError(req);
    return JSON.parse(req.responseText);
  }

  this.compact = function() {
    this.last_req = this.request("POST", this.uri + "_compact");
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  this.setDbProperty = function(propId, propValue) {
    this.last_req = this.request("PUT", this.uri + propId,{
      body:JSON.stringify(propValue)
    });
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  this.getDbProperty = function(propId) {
    this.last_req = this.request("GET", this.uri + propId);
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  this.setAdmins = function(adminsArray) {
    this.last_req = this.request("PUT", this.uri + "_admins",{
      body:JSON.stringify(adminsArray)
    });
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  this.getAdmins = function() {
    this.last_req = this.request("GET", this.uri + "_admins");
    CouchDB.maybeThrowError(this.last_req);
    return JSON.parse(this.last_req.responseText);
  }
  
  // Convert a options object to an url query string.
  // ex: {key:'value',key2:'value2'} becomes '?key="value"&key2="value2"'
  function encodeOptions(options) {
    var buf = []
    if (typeof(options) == "object" && options !== null) {
      for (var name in options) {
        if (!options.hasOwnProperty(name)) continue;
        var value = options[name];
        if (name == "key" || name == "startkey" || name == "endkey") {
          value = toJSON(value);
        }
        buf.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
      }
    }
    if (!buf.length) {
      return "";
    }
    return "?" + buf.join("&");
  }

  function toJSON(obj) {
    return obj !== null ? JSON.stringify(obj) : null;
  }
  
  function combine(object1, object2) {
    if (!object2)
      return object1;
    if (!object1)
      return object2;
      
    for (var name in object2)
      object1[name] = object2[name];
      
    return object1;
  }
  
  
}