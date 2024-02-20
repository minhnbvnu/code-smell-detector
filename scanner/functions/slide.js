function slide(to, slideSpeed) {

      // do nothing if already on requested slide
      if (index == to) return;

      if (!slides) {
        index = to;
        return;
      }

      if (browser.transitions) {

        var direction = Math.abs(index - to) / (index - to); // 1: backward, -1: forward

        // get the actual position of the slide
        if (options.continuous) {
          var naturalDirection = direction;
          direction = -slidePos[circle(to)] / width;

          // if going forward but to < index, use to = slides.length + to
          // if going backward but to > index, use to = -slides.length + to
          if (direction !== naturalDirection) to = -direction * slides.length + to;

        }

        var diff = Math.abs(index - to) - 1;

        // move all the slides between index and to in the right direction
        while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

        to = circle(to);

        move(index, width * direction, slideSpeed || speed);
        move(to, 0, slideSpeed || speed);

        if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

      } else {

        to = circle(to);
        animate(index * -width, to * -width, slideSpeed || speed);
        //no fallback for a circular continuous if the browser does not accept transitions
      }

      index = to;
      offloadFn(options.callback && options.callback(index, slides[index]));
    }