function updateButtonStates(api) {
        var updateNext = hasNext(editor, currentSearchState) ? api.enable : api.disable;
        updateNext('next');
        var updatePrev = hasPrev(editor, currentSearchState) ? api.enable : api.disable;
        updatePrev('prev');
      }