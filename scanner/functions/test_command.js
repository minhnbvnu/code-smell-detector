function test_command(input_text, expected, from_speech_text) {
	const interpretations = interpret_command(input_text);
	const failed_message = `Failed test.${from_speech_text ? ` (From speech '${from_speech_text}')` : ""}`;
	if (expected === null) {
		if (interpretations.length > 0) {
			console.error(`${failed_message}
Expected '${input_text}' to have no interpretations; saw`, interpretations);
		}
		return;
	}
	if (interpretations.length === 0) {
		console.error(`${failed_message}
Expected '${input_text}' to be interpreted as`, expected, `but found no interpretations`);
		return;
	}
	const interpretation = choose_interpretation(interpretations);
	const actual = Object.assign({}, interpretation, {prioritize: undefined, exec: undefined});
	// expected.match_text = expected.match_text || input_text; // puts key in wrong order
	expected = Object.assign({match_text: input_text}, expected);
	const expected_json = JSON.stringify(expected, null, 4);
	const actual_json = JSON.stringify(actual, null, 4);
	if (expected_json !== actual_json) {
		console.error(`${failed_message}
Expected '${input_text}' to be interpreted as ${expected_json} but it was interpreted as ${actual_json}
Note: object key order matters in this test! Functions don't count.
All interpretations:`, interpretations);
		return;
	}
	if (!from_speech_text) {
		// Also verify that if you said exactly this input, speech recognition fixes would not mess it up.
		const fixed_up_input_text = fix_up_speech_recognition(input_text);
		if (fixed_up_input_text !== input_text) {
			console.error(`Failed test. Speech recognition fixup changed the input from:
	'${input_text}' to:
	'${fixed_up_input_text}'`);
			return;
		}
	}
}