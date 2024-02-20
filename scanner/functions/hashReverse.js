function hashReverse(hash){
	if(Variable.cachedHashesReverse[hash])
		return Variable.cachedHashesReverse[hash];
	throw new Error(hash + ' has no precalculated reverse hash');
}