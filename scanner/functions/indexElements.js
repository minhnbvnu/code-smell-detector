function indexElements(state) {
        var all = state.all || getChildren(document), ret = {};
        forEach.call(all, function (elm) {
            if (elm.className && !elm.toString().match(/svg/i)) {
              forEach.call(
                  filter.call(elm.className.split(whitespace), function (n) { return n.length > 0; }),
                  function (n) {
                      if (!ret['.'+n]) ret['.'+n] = [];
                      ret['.'+n].push(elm);
                  });
            } else if(elm.id) {
              if (!ret['#'+elm.id]) ret['#'+elm.id] = [];
                ret['#'+elm.id].push(elm);
            }
        });

        return ret;
    }