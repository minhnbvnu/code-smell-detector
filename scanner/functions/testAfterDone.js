function testAfterDone(){
	var testName = "ensure has correct number of assertions";

	function secondAfterDoneTest(){
		QUnit.config.done = [];
		//QUnit.done = function(){};
		//because when this does happen, the assertion count parameter doesn't actually
		//work we use this test to check the assertion count.
		module("check previous test's assertion counts");
		test('count previous two test\'s assertions', function(){
			var spans = document.getElementsByTagName('span'),
			tests = [],
			countNodes;

			//find these two tests
			for (var i = 0; i < spans.length; i++) {
				if (spans[i].innerHTML.indexOf(testName) !== -1) {
					tests.push(spans[i]);
				}
			}

			//walk dom to counts
			countNodes = tests[0].nextSibling.nextSibling.getElementsByTagName('b');
			equal(countNodes[1].innerHTML, "99");
			countNodes = tests[1].nextSibling.nextSibling.getElementsByTagName('b');
			equal(countNodes[1].innerHTML, "99");
		});
	}
	QUnit.config.done = [];
	QUnit.done(secondAfterDoneTest);

	module("Synchronous test after load of page");

	asyncTest('Async test', function(){
		start();
		for (var i = 1; i < 100; i++) {
			ok(i);
		}
	});

	test(testName, 99, function(){
		for (var i = 1; i < 100; i++) {
			ok(i);
		}
	});

	//we need two of these types of tests in order to ensure that assertions
	//don't move between tests.
	test(testName + ' 2', 99, function(){
		for (var i = 1; i < 100; i++) {
			ok(i);
		}
	});


}