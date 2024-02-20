function __dumpTransformData(items, t="") {
	if (!items || !items.length) { return; }
	items.forEach(o => {
		trace(`${t}-> ${o.name}`);
		trace(`${t} • topLeftInParent: ${__pointToString(o.topLeftInParent)}`);
		trace(`${t} • rotation: ${$.fix(o.rotation)}`);
		trace(`${t} • localBounds: ${__rectToString(o.localBounds)}`);
		trace(`${t} • boundsInParent: ${__rectToString(o.boundsInParent)}`);
		trace(`${t} • matrix: ${o.transform}`);
		__dumpTransformData(o.children, t+"  ");
	})
}