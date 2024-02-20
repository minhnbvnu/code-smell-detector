function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow',
      },
      // @ts-ignore
      duration: {
        type: null,
        value: 300,
        observer: 'observeDuration',
      },
      name: {
        type: String,
        value: 'fade',
      },
    },
    data: {
      type: '',
      inited: false,
      display: false,
    },
    methods: {
      observeShow(value, old) {
        if (value === old) {
          return;
        }
        value ? this.enter() : this.leave();
      },
      enter() {
        const { duration, name } = this.data;
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.enter : duration;
        this.status = 'enter';
        this.$emit('before-enter');
        requestAnimationFrame(() => {
          this.checkStatus('enter');
          this.$emit('enter');
          this.setData({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration,
          });
          requestAnimationFrame(() => {
            this.checkStatus('enter');
            this.transitionEnded = false;
            this.setData({ classes: classNames['enter-to'] });
          });
        });
      },
      leave() {
        if (!this.data.display) {
          return;
        }
        const { duration, name } = this.data;
        const classNames = getClassNames(name);
        const currentDuration = isObj(duration) ? duration.leave : duration;
        this.status = 'leave';
        this.$emit('before-leave');
        requestAnimationFrame(() => {
          this.checkStatus('leave');
          this.$emit('leave');
          this.setData({
            classes: classNames.leave,
            currentDuration,
          });
          requestAnimationFrame(() => {
            this.checkStatus('leave');
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), currentDuration);
            this.setData({ classes: classNames['leave-to'] });
          });
        });
      },
      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },
      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }
        this.transitionEnded = true;
        this.$emit(`after-${this.status}`);
        const { show, display } = this.data;
        if (!show && display) {
          this.setData({ display: false });
        }
      },
    },
  });
}