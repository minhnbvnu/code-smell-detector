function generateBody (method, command, args, rid) {
  rid = rid || 1;
  return '{"do":"' + method + '","args":["' + command + '"' + (args ? ', ' + JSON.stringify(args) : '') + '],"id":' + rid + '}';
}