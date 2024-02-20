function getAliases(item)
	{
		return item.pop
			? item
			: item.split(/\s+/)
			;
	}