function removeSelector(elms, selector){
      var which = selector.substr(0, 1);
      selector = selector.substr(1);
      if(which === '.') removeClass(elms, selector);
      else if(which === '#') forEach.call(elms, function(elm){ elm.attributes.removeNamedItem('id'); });
    }