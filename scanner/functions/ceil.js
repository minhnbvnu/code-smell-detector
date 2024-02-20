function ceil(date) {
      step(date = local(new d3_time(date - 1)), 1);
      return date;
    }