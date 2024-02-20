function d3_timer_mark() {
    var now = Date.now();
    d3_timer_active = d3_timer_queueHead;
    while (d3_timer_active) {
      if (now >= d3_timer_active.time) d3_timer_active.flush = d3_timer_active.callback(now - d3_timer_active.time);
      d3_timer_active = d3_timer_active.next;
    }
    return now;
  }