function exp(type) {
      if (type == wanted) { return cont(); }
      else if (wanted == ";") { return pass(); }
      else { return cont(exp); }
    }