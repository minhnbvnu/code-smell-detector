function show_window_switcher(cycle_backwards) {
		if ($window_switcher.is(":visible")) {
			cycle_window_switcher(cycle_backwards);
			return;
		}
		$window_switcher_list.empty();
		const tasks = Task.all_tasks;
		if (tasks.length === 1) {
			activate_window(tasks[0].$window);
			if (!used_window_switcher) {
				agent?.stopCurrent(); // needed to continue on from the message with `hold` set (speak(message, true))
				agent?.speak("If there's only one window, Alt+1 will switch to it right away.");
				// used_window_switcher = true; // allow the switching message to be spoken later
			}
			return;
		}
		if (tasks.length < 2) {
			return;
		}
		tasks.sort((a, b) =>
			// using z-index, as it's similar to last-used order
			b.$window[0].style.zIndex - a.$window[0].style.zIndex
		);
		for (const task of tasks) {
			var $window = task.$window;
			var $item = $("<li>").addClass("window-switcher-item");
			$item.append($window.getIconAtSize(32) ?? $("<img>").attr({
				src: "/images/icons/task-32x32.png",
				width: 32,
				height: 32,
				alt: $window.getTitle()
			}));
			$item.data("$window", $window);
			// $item.on("click", function () { // Windows 98 didn't allow clicking items in the window switcher.
			// 	activate_window($window);
			// });
			$window_switcher_list.append($item);
			if ($window.hasClass("focused")) {
				$item.addClass("active");
			}
		}
		cycle_window_switcher(cycle_backwards);
		$window_switcher.appendTo("body");
		// console.log("Showing window switcher", $window_switcher[0]);
		if (!used_window_switcher) {
			agent?.stopCurrent(); // needed to continue on from the message with `hold` set (speak(message, true))
			// Um, if you know about Alt+Tab, you can guess about how Alt+1 works. But Clippy is supposed to be annoying, right?
			agent?.speak("There you go! Press 1 until you get to the window you want.");
			used_window_switcher = true;
		}
	}