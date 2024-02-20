function Machine(
    numStates,
    numSymbols,
    tapeLength,
    canvasWidth,
    canvasHeight
)
{
    assert (
        numStates >= 1,
        'must have at least 1 state'
    );

    assert (
        numSymbols >= 2,
        'must have at least 2 symbols'
    );

    /// Number of states and symbols
    this.numStates = numStates;
    this.numSymbols = numSymbols;

    /// Map (2D tape)
    this.tape = Array(tapeLength);

    /// Canvas width and height
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    /// Transition table
    this.table = new Array(numStates * numSymbols * 4);

    // Generate random transitions
    for (var st = 0; st < numStates; ++st)
    {
        for (var sym = 0; sym < numSymbols; ++sym)
        {
            this.setTrans(
                st,
                sym,
                rnd.index(numStates),
                rnd.index(numSymbols),
                rnd.index(NUM_TAPE_ACTIONS),
                rnd.index(NUM_OUT_ACTIONS)
            );
        }
    }

    // Initialize the state
    this.reset();
}