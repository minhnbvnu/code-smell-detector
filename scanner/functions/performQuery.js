function performQuery(q, onComplete) {

  if (!AbstractSearch.prototype.shouldSearch(q)) {
    return null;
  }

  // split the query into a command and query string if possible
  let arr = q.match(/(^\/\w+)? *(.*)?/);
  let cmdStr = arr[1] || "";
  let query = arr[2] || "";

  log(arr[0] + " cmd: '" + cmdStr + "' q: '" + query + "'");

  // lookup the command
  let cmd = commands[cmdStr];

  if (cmd) {
    log("executing cmd", cmd);
    cmd.run(query, onComplete);
  } else {
    // no command detected, run the base search with the original query string
    onComplete(search.executeSearch(q, false, false))
  }
}