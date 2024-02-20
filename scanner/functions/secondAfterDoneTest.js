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