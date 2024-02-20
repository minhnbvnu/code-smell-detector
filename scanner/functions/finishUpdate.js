function finishUpdate(data_) {
        data = data_;
        if (finished) return;
        if (!data || !data.list.length) return done();
        if (completion.widget) completion.widget.close();
        completion.widget = new Widget(completion, data);
      }