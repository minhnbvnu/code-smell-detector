function Profiler() {
    // Should be an integer multiple of the graphics period so that
    // graphics appears a representable number of times in the profile
    // data. The first interval is "1" to get results immediately.
    this.framesThisInterval       = 1;
    this.framesSinceIntervalStart = 0;
    this.intervalStartTime        = NaN;

    this.graphicsPeriod           = 1;

    this.lastGraphicsPeriodChangeTime = -Infinity;

    // Accumulated physics time for the interval.  Because the physics
    // time is micro-profiled, this does not give the accuracy of the
    // overall frame timing, but it does have better accuracy than
    // measuring a single frame.
    this.physicsAccumTime          = 0;

    // Time spent purely on the virtual CPU for graphics. This can be
    // severely reduced by altering frame rate.
    this.graphicsAccumTime         = 0;

    // Time spent on the virtual CPU on logic tasks (not draw call submission or physics)
    this.logicAccumTime            = 0;

    // Time spent on the virtual GPU
    this.gpuAccumTime              = 0;

    // Number of frames that would have actually been rendered
    // (taking graphicsPeriod into account) that were in fact
    // missed due to backlog. Only tracked in threaded mode
    this.missedFrames              = 0;

    const cutoff = 2e-3;
    const speed = 0.09;
    
    // Estimates of time spent on each part of the computation on the
    // virtual CPU
    this.smoothLogicTime           = new EuroFilter(cutoff, speed);
    this.smoothPhysicsTime         = new EuroFilter(cutoff, speed);
    this.smoothGraphicsTime        = new EuroFilter(cutoff, speed);

    // Graphics time on the virtual GPU, per frame *actually processed* by the
    // GPU. This is updated by submitFrame() from quadplay-browser.js.
    this.smoothGPUTime             = new EuroFilter(cutoff, speed);

    // Interval between frames, not time spent in computation
    this.smoothFrameTime           = new EuroFilter(cutoff, speed);

    // Used for measuring compute time in a frame
    this.currentFrameStartTime     = this.now();

    // Set to true when debugging the profiler itself
    // to track and display metadata
    this.debuggingProfiler         = false;
    this.reset();
}