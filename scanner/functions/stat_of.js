function stat_of(comb, tag) {
    return cont(pushlex("stat", tag), comb, poplex, block);
  }