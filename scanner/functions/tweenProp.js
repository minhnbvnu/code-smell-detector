function tweenProp (start, end, easingFunc, position) {
      return start + (end - start) * easingFunc(position);
    }