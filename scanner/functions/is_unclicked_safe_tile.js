function is_unclicked_safe_tile(el) {
		var tile = minesweeper_.grid.get_tile_from_td(el);
		return tile && !tile.is_a_mine_ && !tile.is_revealed_;
	}