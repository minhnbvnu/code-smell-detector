function test_speech(input_text, expected) {
	const fixed_up_input_text = fix_up_speech_recognition(input_text);
	if (typeof expected === "string") {
		if (fixed_up_input_text !== expected) {
			console.error(`Failed test. Speech recognition fixup changed the input from:
	'${input_text}' to:
	'${fixed_up_input_text}' instead of:
	'${expected}'`);
			return;
		}
	} else {
		test_command(fixed_up_input_text, expected, input_text);
	}
}