constructor(map, moveTolerance) {
    super(map);

    /**
     * This is the element that we will listen to the real events on.
     * @type {import("./Map.js").default}
     * @private
     */
    this.map_ = map;

    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    this.clickTimeoutId_;

    /**
     * Emulate dblclick and singleclick. Will be true when only one pointer is active.
     * @type {boolean}
     */
    this.emulateClicks_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.dragging_ = false;

    /**
     * @type {!Array<import("./events.js").EventsKey>}
     * @private
     */
    this.dragListenerKeys_ = [];

    /**
     * @type {number}
     * @private
     */
    this.moveTolerance_ = moveTolerance === undefined ? 1 : moveTolerance;

    /**
     * The most recent "down" type event (or null if none have occurred).
     * Set on pointerdown.
     * @type {PointerEvent|null}
     * @private
     */
    this.down_ = null;

    const element = this.map_.getViewport();

    /**
     * @type {Array<PointerEvent>}
     * @private
     */
    this.activePointers_ = [];

    /**
     * @type {!Object<number, Event>}
     * @private
     */
    this.trackedTouches_ = {};

    this.element_ = element;

    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */
    this.pointerdownListenerKey_ = listen(
      element,
      PointerEventType.POINTERDOWN,
      this.handlePointerDown_,
      this,
    );

    /**
     * @type {PointerEvent}
     * @private
     */
    this.originalPointerMoveEvent_;

    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */
    this.relayedListenerKey_ = listen(
      element,
      PointerEventType.POINTERMOVE,
      this.relayMoveEvent_,
      this,
    );

    /**
     * @private
     */
    this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this);

    this.element_.addEventListener(
      EventType.TOUCHMOVE,
      this.boundHandleTouchMove_,
      PASSIVE_EVENT_LISTENERS ? {passive: false} : false,
    );
  }