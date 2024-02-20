function prev(slideSpeed) {

      if (options.continuous) slide(index - 1, slideSpeed);
      else if (index) slide(index - 1, slideSpeed);

    }