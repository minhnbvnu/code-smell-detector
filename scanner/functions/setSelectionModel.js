function setSelectionModel(e){selectionModel&&(selectionModel.onSelectedRangesChanged.unsubscribe(handleSelectedRangesChanged),selectionModel.destroy&&selectionModel.destroy()),(selectionModel=e)&&(selectionModel.init(self),selectionModel.onSelectedRangesChanged.subscribe(handleSelectedRangesChanged))}