function printTest (e, container) {
	e.push([
		' // Copyright 2017 The Lynx Authors. All rights reserved.',
	]);

	e.emitPrologue();
	var containerLayoutTree = calculateTree(container);

	for (var i=0; i<containerLayoutTree.length; i++) {
		e.emitTestPrologue(containerLayoutTree[i].name);
		setUpTestTree(
			e,
			undefined,
			containerLayoutTree[i],
			'root',
			null
		) 
		e.push('');
		e.AddElementToBody();
		assertTestTree(e, containerLayoutTree[i], 'root', null);
		e.emitTestEpilogue();
	}

	e.emitEpilogue();
  e.print();
}