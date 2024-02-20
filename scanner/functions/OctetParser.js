function OctetParser(options){
    if(!(this instanceof OctetParser)) return new OctetParser(options);
    EventEmitter.call(this);
}