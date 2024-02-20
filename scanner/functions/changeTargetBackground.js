function changeTargetBackground() {
			var target = $(targetObject);
			if (targetHighlightClass) {
				executeForTargets(function (target) {
					target.addClass(targetHighlightClass);
				});
			}

			if (noTargetHighlight) {
				return;
			}

			// Make sure that multiple invokations of
			// changeTargetBackground don't set an incorrect
			// data-original-background-color.
			restoreTargetBackground();

			// set background color to give visual feedback which link is modified
			if (target.context && target.context.style &&
				target.context.style['background-color']) {
				executeForTargets(function (target) {
					target.attr('data-original-background-color',
					            target.context.style['background-color']);
				});
			}
			executeForTargets(function (target) {
				target.css('background-color', '#80B5F2');
			});
		}