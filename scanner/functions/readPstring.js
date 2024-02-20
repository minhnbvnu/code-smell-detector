function readPstring(){
   var result;
   result = (isNodeHigh(nodenames['p7'])?'N':'n') +
            (isNodeHigh(nodenames['p6'])?'V':'v') +
            '&#8209' +  // non-breaking hyphen
            (isNodeHigh(nodenames['p4'])?'B':'b') +
            (isNodeHigh(nodenames['p3'])?'D':'d') +
            (isNodeHigh(nodenames['p2'])?'I':'i') +
            (isNodeHigh(nodenames['p1'])?'Z':'z') +
            (isNodeHigh(nodenames['p0'])?'C':'c');
   return result;
}