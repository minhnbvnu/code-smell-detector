function entries_contains_update($entries, id) {
			return $entries.get().some((el_from_this_version)=> 
				id === el_from_this_version.id
			);
		}