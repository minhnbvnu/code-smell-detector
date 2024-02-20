function doAround(func, aroundFunc){
    return function(){
        aroundFunc.prototype._innerFunc = func

        return aroundFunc.apply(this,arguments)
    };
}