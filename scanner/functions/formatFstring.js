function formatFstring(f){
    var result;
    result=
        ((f & 0x80)?'S':'s') +
        ((f & 0x40)?'Z':'z') +
        ((f & 0x20)?'Y':'y') +
        ((f & 0x10)?'H':'h') +
        ((f & 0x08)?'X':'x') +
        ((f & 0x04)?'P':'p') +
        ((f & 0x02)?'N':'n') +
        ((f & 0x01)?'C':'c');
    return result;
}