constructor(options) {
    super();

    options = Object.assign(
      {
        animate: true,
        params: ['x', 'y', 'z', 'r', 'l'],
        replace: false,
        prefix: '',
      },
      options || {},
    );

    let animationOptions;
    if (options.animate === true) {
      animationOptions = {duration: 250};
    } else if (!options.animate) {
      animationOptions = null;
    } else {
      animationOptions = options.animate;
    }

    /**
     * @type {import('../View.js').AnimationOptions|null}
     * @private
     */
    this.animationOptions_ = animationOptions;

    /**
     * @type {Object<Params, boolean>}
     * @private
     */
    this.params_ = options.params.reduce((acc, value) => {
      acc[value] = true;
      return acc;
    }, {});

    /**
     * @private
     * @type {boolean}
     */
    this.replace_ = options.replace;

    /**
     * @private
     * @type {string}
     */
    this.prefix_ = options.prefix;

    /**
     * @private
     * @type {!Array<import("../events.js").EventsKey>}
     */
    this.listenerKeys_ = [];

    /**
     * @private
     * @type {boolean}
     */
    this.initial_ = true;

    this.updateState_ = this.updateState_.bind(this);

    /**
     * The tracked parameter callbacks.
     * @private
     * @type {Object<string, Callback>}
     */
    this.trackedCallbacks_ = {};

    /**
     * The tracked parameter values.
     * @private
     * @type {Object<string, string|null>}
     */
    this.trackedValues_ = {};
  }