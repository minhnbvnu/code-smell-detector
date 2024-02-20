function reach_dropdown_esm_reducer(state, action) {
  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case CLICK_MENU_ITEM:
      return reach_dropdown_esm_extends({}, state, {
        isExpanded: false,
        selectionIndex: -1
      });

    case CLOSE_MENU:
      return reach_dropdown_esm_extends({}, state, {
        isExpanded: false,
        selectionIndex: -1
      });

    case OPEN_MENU_AT_FIRST_ITEM:
      return reach_dropdown_esm_extends({}, state, {
        isExpanded: true,
        selectionIndex: 0
      });

    case OPEN_MENU_AT_INDEX:
      return reach_dropdown_esm_extends({}, state, {
        isExpanded: true,
        selectionIndex: action.payload.index
      });

    case OPEN_MENU_CLEARED:
      return reach_dropdown_esm_extends({}, state, {
        isExpanded: true,
        selectionIndex: -1
      });

    case SELECT_ITEM_AT_INDEX:
      {
        var _action$payload$dropd = action.payload.dropdownRef,
            dropdownRef = _action$payload$dropd === void 0 ? {
          current: null
        } : _action$payload$dropd;

        if (action.payload.index >= 0 && action.payload.index !== state.selectionIndex) {
          if (dropdownRef.current) {
            var doc = getOwnerDocument(dropdownRef.current);

            if (dropdownRef.current !== (doc == null ? void 0 : doc.activeElement)) {
              dropdownRef.current.focus();
            }
          }

          return reach_dropdown_esm_extends({}, state, {
            selectionIndex: action.payload.max != null ? Math.min(Math.max(action.payload.index, 0), action.payload.max) : Math.max(action.payload.index, 0)
          });
        }

        return state;
      }

    case CLEAR_SELECTION_INDEX:
      return reach_dropdown_esm_extends({}, state, {
        selectionIndex: -1
      });

    case SET_BUTTON_ID:
      return reach_dropdown_esm_extends({}, state, {
        triggerId: action.payload
      });

    case SEARCH_FOR_ITEM:
      if (typeof action.payload !== "undefined") {
        return reach_dropdown_esm_extends({}, state, {
          typeaheadQuery: action.payload
        });
      }

      return state;

    default:
      return state;
  }
}