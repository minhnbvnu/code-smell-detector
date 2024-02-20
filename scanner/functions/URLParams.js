function URLParams() {
      this.get = bind(this.get, this);
      var decode, match, pl, query, search;
      pl = /\+/g;
      search = /([^&=]+)=?([^&]*)/g;
      decode = function(s) {
        return decodeURIComponent(s.replace(pl, " "));
      };
      query = window.location.search.substring(1);
      while (match = search.exec(query)) {
        this[decode(match[1])] = decode(match[2]);
      }
    }