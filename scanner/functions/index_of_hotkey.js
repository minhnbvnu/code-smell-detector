function index_of_hotkey(text) {
		// Returns the index of the ampersand that defines a hotkey, or -1 if not present.

		// return english_text.search(/(?<!&)&(?!&|\s)/); // not enough browser support for negative lookbehind assertions

		// The space here handles beginning-of-string matching and counteracts the offset for the [^&] so it acts like a negative lookbehind
		return ` ${text}`.search(/[^&]&[^&\s]/);
	}