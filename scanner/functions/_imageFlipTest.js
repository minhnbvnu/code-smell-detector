function _imageFlipTest(selection, root) {
	let items = selection.items, imgSrc, target;
	for (let i=0; i < items.length; i++) {
		let o = items[i];
		if (o.fill instanceof xd.ImageFill) { imgSrc = o; }
		else if (o instanceof xd.Rectangle) { target = o; }
	}
	if (!imgSrc || !target) { trace("select two rectangles, one with an image fill, one without."); return; }
	target.fill = imgSrc.fill;
	trace("src matrix:", imgSrc.transform);
}