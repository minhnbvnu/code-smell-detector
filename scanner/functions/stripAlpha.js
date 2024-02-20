function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }