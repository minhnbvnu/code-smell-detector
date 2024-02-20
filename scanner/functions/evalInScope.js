function evalInScope() {
  var console = {
    str: '',
    log: function() {
      this.str += Array.from(arguments).join(',') + '\n';
    }
  };
  var children = [];
  var document = {
    createElement: function(name) {
      return {
        tagName: name
      };
    },
    head: {
      appendChild: function(child) {
        children.push(child);
      }
    }
  };
  // Used for global scope in bundle wrapper.
  var self = {};
  eval(arguments[0] + (arguments[1] || '') + (arguments[2] || ''));
  return {
    console: console,
    children: children,
    self: self,
  };
}