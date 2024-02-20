function useTableContextHelper(
	tableContext,
	cellContext,
	fixedLayout
) {
	const isActive =
		tableContext.activeCell.rowIndex === cellContext.rowIndex &&
		tableContext.activeCell.columnIndex === cellContext.columnIndex;

	const hasFocus = fixedLayout && tableContext.tableHasFocus && isActive;
	const { changeActiveCell, handleKeyDown: handleTableKeyDown } = tableContext;
	const handleFocus = useCallback(() => {
		if (fixedLayout && tableContext.allowKeyboardNavigation) {
			changeActiveCell(cellContext.rowIndex, cellContext.columnIndex);
		}
	}, [
		fixedLayout,
		tableContext.allowKeyboardNavigation,
		changeActiveCell,
		cellContext.rowIndex,
		cellContext.columnIndex,
	]);

	const handleKeyDown = useCallback(
		(event) => {
			if (fixedLayout && tableContext.allowKeyboardNavigation) {
				handleTableKeyDown(event);
			}
		},
		[fixedLayout, tableContext.allowKeyboardNavigation, handleTableKeyDown]
	);

	const tabIndex =
		fixedLayout &&
		isActive &&
		!tableContext.activeElement &&
		tableContext.allowKeyboardNavigation
			? '0'
			: undefined;

	return { tabIndex, hasFocus, handleFocus, handleKeyDown };
}