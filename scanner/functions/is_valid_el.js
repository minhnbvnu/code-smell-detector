function is_valid_el(el) {
			if (!el)
				return false;
			if (valid_el_cache.has(el))
				return valid_el_cache.get(el);
			var result = !!find_source([el]);
			valid_el_cache.set(el, result, 3);
			return result;
		}