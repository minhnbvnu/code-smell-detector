function prepVararg(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){ptr+=4}}else{}return ptr}