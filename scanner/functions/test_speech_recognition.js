function test_speech_recognition() {
		// test_command("select blue", {color: "blue"}); // @FIXME
		test_command("select fill", { tool_id: TOOL_FILL });
		test_command("select text", { tool_id: TOOL_TEXT });
		test_command("select", { tool_id: TOOL_SELECT });
		test_speech("free form select", { tool_id: TOOL_FREE_FORM_SELECT });
		test_speech("lips", { match_text: "ellipse", tool_id: TOOL_ELLIPSE });
		test_command("", null);
		// test_command("I got you some new books", null);
		// test_command("pan view sorthweast", null); // currently opens View menu
		test_command("1 pixel lines", { size: 1 });
		test_command("1 pixel wide lines", { size: 1 });
		test_command("set line width to 5", { size: 5 });
		// test_command("use medium-small stroke size", {match_text: "use medium-small stroke size", size: NaN});
		test_speech("set line lips to a hundred", { match_text: "set line width to a hundred", size: 100 });
		test_command("use stroke size 10 pixels", { size: 10 });
		// test_command("use stroke size of 10 pixels", {match_text: "use stroke size of 10 pixels", size: 10});
		test_command("draw a :-)", { sketch_subject: "smiley face" });
		// test_command("draw sample text", {sketch_subject: "sample text"}); // @FIXME
		test_command("end", { type: "stop-drawing" });
		test_command("stop", { type: "stop-drawing" });
		test_command("draw a stop sign", { sketch_subject: "stop sign" });

		test_command("pan view southwest", { vector: { x: -1, y: +1 } });
		test_command("pan southeast", { vector: { x: +1, y: +1 } });
		test_command("move view northwest", { vector: { x: -1, y: -1 } });
		test_command("view northwest", { vector: { x: -1, y: -1 } });
		test_command("move viewport northwest", { vector: { x: -1, y: -1 } });
		test_command("pan down", { vector: { x: 0, y: +1 } });
		test_command("scroll down", { vector: { x: 0, y: +1 } });
		test_command("go downwards", { vector: { x: 0, y: +1 } });
		test_command("go upward", { vector: { x: 0, y: -1 } });
		test_command("go downwards and to the left", { vector: { x: -1, y: +1 } });
		test_command("go up to the left", { vector: { x: -1, y: -1 } });
		test_speech("cool up", { match_text: "go up", vector: { x: 0, y: -1 } });
		test_command("scroll the view southward", { vector: { x: 0, y: +1 } });

	}