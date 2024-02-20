function allTCStates( useHTML )
{
    var s = "";
    var _spc;
    useHTML = (typeof useHTML === 'undefined') ? false : useHTML;
        // Use Non-Breaking Space for presentation in an HTML (browser)
        // context, else use ASCII space for logging context
    _spc = useHTML ? '&nbsp;' : ' ';
    if ( !isNodeHigh( nodenames[ 'clock1' ] ) ) s += "T0"; else s += "..";
    s += _spc;
        // T+ in visual6502 is called T1x in
        // http://www.weihenstephan.org/~michaste/pagetable/6502/6502.jpg
        // Notated as T+ for compatibility with PLA node names
    if ( !isNodeHigh( nodenames[ 'clock2' ] ) ) s += "T+"; else s += "..";
    s += _spc;
    if ( !isNodeHigh( nodenames[ 't2' ] ) ) s += "T2"; else s += "..";
    s += _spc;
    if ( !isNodeHigh( nodenames[ 't3' ] ) ) s += "T3"; else s += "..";
    s += _spc;
    if ( !isNodeHigh( nodenames[ 't4' ] ) ) s += "T4"; else s += "..";
    s += _spc;
    if ( !isNodeHigh( nodenames[ 't5' ] ) ) s += "T5"; else s += "..";
    s += _spc + "[";
    // Check three confirmed exclusive states (three nodes)
    if ( isNodeHigh( 862 ) ) {
        s += "T1";
        // ...else if VEC0 is on...
    } else if ( isNodeHigh( nodenames[ 'VEC0' ] ) ) {
        // ...then tell the outside world
        s += "V0";
        // ...else if VEC1 is on...
    } else if ( isNodeHigh( nodenames[ 'VEC1' ] ) ) {
        // ...then this is the canonical T6. It is a synonym for VEC1
        s += "T6";
    } else {
        // ...else none of the "hidden" bits in the clock state is active
        s += "..";
    }
    s += "]" + _spc;
    // Check the RCL's two confirmed exclusive states (two nodes)
        // If this node is grounding ~WR...
    if ( isNodeHigh( 440 ) ) {
        // ...then we can regard this state as Store Data 1
        s += "SD1";
        // ...else if this node is grounding ~WR...
    } else if ( isNodeHigh( 1258 ) ) {
        // ...then we can regard this state as Store Data 2
        s += "SD2";
    } else {
        // ...else none of the RCL-resident timing bits is active
        s += "...";
    }
    return s;
}