function event_in_single_chord(e, wanted_chord) {
			var map = get_keystrs_map(e, true);
			for (var key in map) {
				// otherwise, modifiers like ctrl etc. get counted, even if they're not pressed (because get_keystrs_map reports them as false)
				// todo: if this function is ever called in keyup, another solution is needed.
				// for now, it'll only ever be called on keydown
				if (!map[key])
					continue;
				if (keystr_in_trigger(key, wanted_chord))
					return true;
			}
			return false;
		}