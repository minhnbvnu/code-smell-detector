function restoreTargetBackground() {
			var target = $(targetObject);
			if (targetHighlightClass) {
				executeForTargets(function (target) {
					target.removeClass(targetHighlightClass);
				});
			}
			if (noTargetHighlight) {
				return;
			}
			// Remove the highlighting and restore original color if was set before
			var color = target.attr('data-original-background-color');
			executeForTargets(function (target) {
				target.css('background-color', color || '');
			});
			if (!target.attr('style')) {
				executeForTargets(function (target) {
					target.removeAttr('style');
				});
			}
			executeForTargets(function (target) {
				target.removeAttr('data-original-background-color');
			});
		}