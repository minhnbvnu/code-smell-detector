function swipeCounter() {
    return {
      require: '^swipeWrap',
      template: '{{ SwipeCtrl.getPos() }}',
    };
  }