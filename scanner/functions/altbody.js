function altbody(type) {
    if (type == "{") return cont(pushlex("}", "alt"), altblock1, poplex);
    return pass();
  }