function equalByTag$1(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag$4:if(object.byteLength!=other.byteLength||object.byteOffset!=other.byteOffset)return!1;object=object.buffer,other=other.buffer;case arrayBufferTag$3:return!(object.byteLength!=other.byteLength||!equalFunc(new Uint8Array$1(object),new Uint8Array$1(other)));case boolTag$3:case dateTag$3:case numberTag$3:return eq$1(+object,+other);case errorTag$2:return object.name==other.name&&object.message==other.message;case regexpTag$3:case stringTag$3:return object==other+"";case mapTag$5:var convert=mapToArray;case setTag$5:var isPartial=bitmask&COMPARE_PARTIAL_FLAG$4;if(convert||(convert=setToArray$2),object.size!=other.size&&!isPartial)return!1;var stacked=stack.get(object);if(stacked)return stacked==other;bitmask|=COMPARE_UNORDERED_FLAG$2,stack.set(object,other);var result=equalArrays$1(convert(object),convert(other),bitmask,customizer,equalFunc,stack);return stack.delete(object),result;case symbolTag$3:if(symbolValueOf$1)return symbolValueOf$1.call(object)==symbolValueOf$1.call(other)}return!1}