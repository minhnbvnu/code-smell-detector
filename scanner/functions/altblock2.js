function altblock2(type) {
    if (type == "{") return cont(pushlex("}", "alt"), block, poplex, altblock1);
    else return pass(altblock1);
  }