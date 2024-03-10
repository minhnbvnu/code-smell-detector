function combineShapes(node, ctx, aggressive=false) {
	// TODO: currently only subgroups set to "Combine Shapes" will be collapsed back into a
	// parent that is also set to "Combine Shapes". It would be nice if a CS parent could
	// combine in any subgroups if they are ONLY comprised of shapes.

	// Combines shapes into a single SVG output. In normal mode, it will only combine adjacent Path nodes.
	// In aggressive mode, it will combine Path & Container, and collapse groups that only contain those elements.
	if (!node || !node.children || node.children.length < 1 || node.hasCombinedShapes) { return; }
	node.hasCombinedShapes = true;
	let isFile = (node instanceof Artboard) || (node instanceof Component);
	if (isFile) { ctx.pushWidget(node); }

	let inGroup = (node instanceof Artboard) || (node instanceof Component) || (node instanceof Group);
	let shapeIndex, shape = null, kids = node.children;
	let maxCount = kids.length * 2; // TODO: GS: This is a temporary fail-safe, since infinite loops can take down XD.
	
	// This iterates one extra time with a null child to resolve the final shape:
	for (let i = 0; i <= kids.length; i++) {
		if (--maxCount < 0) { throw("infinite loop in combineShapes"); }

		let child = kids[i];
		if (child && child.children) {
			let aggressiveGroup = aggressive || NodeUtils.getProp(child.xdNode, PropType.COMBINE_SHAPES);
			combineShapes(child, ctx, aggressiveGroup);
			
			let onlyChild = child.children.length === 1 && child.children[0];
			if (aggressiveGroup && inGroup && child instanceof Group && onlyChild instanceof Shape && !Shape.hasInteraction(child)) {
				// the only child was a Shape, so we can strip the group and leave just the shape.
				// this is currently necessary despite the check below, because the id changes when the xdNode changes:
				ctx.removeShapeData(onlyChild);
				// set the shape's xdNode to the group, so it uses its transform:
				onlyChild.xdNode = child.xdNode;
				// similarly copy the group's decorators onto the child:
				// TODO: GS: test this with a blend on the child & on the group.
				onlyChild.decorators = child.decorators;
				kids.splice(i, 1, onlyChild);
				child = onlyChild;
				// does not become the active shape because it has to be nested to retain transform.
			}
		}
		if (!shape && Shape.canAdd(child, aggressive)) {
			// start a new shape, the child will be added to it below.
			shape = new Shape(child.xdNode, ctx);
			shapeIndex = i;
		}
		if (shape && shape.add(child, aggressive)) {
			// Added.
			if (child instanceof Shape) { ctx.removeShapeData(child) }
		} else if (shape) {
			// Not able to add the child to the current shape, so end it.
			ctx.addShapeData(shape);
			kids.splice(shapeIndex, shape.count, shape);
			i -= shape.count - 1;
			shape = null;
			// If the child can be added, then iterate over it again, so it starts a new shape.
			// This typically happens because it had interactivity.
			if (Shape.canAdd(child, aggressive)) { i--; continue; }
		}
	}
	if (isFile) { ctx.popWidget(); }
}