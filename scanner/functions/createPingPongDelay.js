function createPingPongDelay(delayTime, feedback){

    // example of delay effect.
    //Taken from http://stackoverflow.com/questions/20644328/using-channelsplitter-and-mergesplitter-nodes-in-web-audio-api

    var merger = context.createChannelMerger(2);
    var leftDelay = context.createDelay();
    var rightDelay = context.createDelay();
    var leftFeedback = context.createGain();
    var rightFeedback = context.createGain();
    var splitter = context.createChannelSplitter(2);


    splitter.connect( leftDelay, 0 );
    splitter.connect( rightDelay, 1 );

    leftDelay.delayTime.value = delayTime;
    rightDelay.delayTime.value = delayTime;

    leftFeedback.gain.value = feedback;
    rightFeedback.gain.value = feedback;

    // Connect the routing - left bounces to right, right bounces to left.
    leftDelay.connect(leftFeedback);
    leftFeedback.connect(rightDelay);

    rightDelay.connect(rightFeedback);
    rightFeedback.connect(leftDelay);

    // Re-merge the two delay channels into stereo L/R
    leftFeedback.connect(merger, 0, 0);
    rightFeedback.connect(merger, 0, 1);

    // Now connect your input to "splitter", and connect "merger" to your output destination.

    return{
        splitter: splitter,
        merger: merger
    }
    }