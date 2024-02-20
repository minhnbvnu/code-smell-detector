function formatRoomType(value) {
	const option = getAllRoomTypes().find(option => option.value === value)
	return option?.label ?? null
}