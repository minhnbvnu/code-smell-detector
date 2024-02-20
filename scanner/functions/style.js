function style(elm, props){
      forEach.call(Object_keys(props),
        function (ii) {
          try {
            var name = ii.replace(/\-([a-z])/ig, function(a, l){ return l.toUpperCase() });
            var value = props[ii];
            elm.style[name] = typeof value == 'number' && name != 'zIndex' ? (value + 'px') : value;
          } catch(x) { }
        }
      );
    }