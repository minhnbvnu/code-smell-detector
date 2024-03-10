function reduceTreeState(store, state, action) {
  let {
    numElements,
    ownerSubtreeLeafElementID,
    selectedElementIndex,
    selectedElementID
  } = state;
  const ownerID = state.ownerID;
  let lookupIDForIndex = true; // Base tree should ignore selected element changes when the owner's tree is active.

  if (ownerID === null) {
    switch (action.type) {
      case 'HANDLE_STORE_MUTATION':
        numElements = store.numElements; // If the currently-selected Element has been removed from the tree, update selection state.

        const removedIDs = action.payload[1]; // Find the closest parent that wasn't removed during this batch.
        // We deduce the parent-child mapping from removedIDs (id -> parentID)
        // because by now it's too late to read them from the store.

        while (selectedElementID !== null && removedIDs.has(selectedElementID)) {
          selectedElementID = removedIDs.get(selectedElementID);
        }

        if (selectedElementID === 0) {
          // The whole root was removed.
          selectedElementIndex = null;
        }

        break;

      case 'SELECT_CHILD_ELEMENT_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex !== null) {
          const selectedElement = store.getElementAtIndex(selectedElementIndex);

          if (selectedElement !== null && selectedElement.children.length > 0 && !selectedElement.isCollapsed) {
            const firstChildID = selectedElement.children[0];
            const firstChildIndex = store.getIndexOfElementID(firstChildID);

            if (firstChildIndex !== null) {
              selectedElementIndex = firstChildIndex;
            }
          }
        }

        break;

      case 'SELECT_ELEMENT_AT_INDEX':
        ownerSubtreeLeafElementID = null;
        selectedElementIndex = action.payload;
        break;

      case 'SELECT_ELEMENT_BY_ID':
        ownerSubtreeLeafElementID = null; // Skip lookup in this case; it would be redundant.
        // It might also cause problems if the specified element was inside of a (not yet expanded) subtree.

        lookupIDForIndex = false;
        selectedElementID = action.payload;
        selectedElementIndex = selectedElementID === null ? null : store.getIndexOfElementID(selectedElementID);
        break;

      case 'SELECT_NEXT_ELEMENT_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex === null || selectedElementIndex + 1 >= numElements) {
          selectedElementIndex = 0;
        } else {
          selectedElementIndex++;
        }

        break;

      case 'SELECT_NEXT_SIBLING_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex !== null) {
          const selectedElement = store.getElementAtIndex(selectedElementIndex);

          if (selectedElement !== null && selectedElement.parentID !== 0) {
            const parent = store.getElementByID(selectedElement.parentID);

            if (parent !== null) {
              const {
                children
              } = parent;
              const selectedChildIndex = children.indexOf(selectedElement.id);
              const nextChildID = selectedChildIndex < children.length - 1 ? children[selectedChildIndex + 1] : children[0];
              selectedElementIndex = store.getIndexOfElementID(nextChildID);
            }
          }
        }

        break;

      case 'SELECT_OWNER_LIST_NEXT_ELEMENT_IN_TREE':
        if (selectedElementIndex !== null) {
          if (ownerSubtreeLeafElementID !== null && ownerSubtreeLeafElementID !== selectedElementID) {
            const leafElement = store.getElementByID(ownerSubtreeLeafElementID);

            if (leafElement !== null) {
              let currentElement = leafElement;

              while (currentElement !== null) {
                if (currentElement.ownerID === selectedElementID) {
                  selectedElementIndex = store.getIndexOfElementID(currentElement.id);
                  break;
                } else if (currentElement.ownerID !== 0) {
                  currentElement = store.getElementByID(currentElement.ownerID);
                }
              }
            }
          }
        }

        break;

      case 'SELECT_OWNER_LIST_PREVIOUS_ELEMENT_IN_TREE':
        if (selectedElementIndex !== null) {
          if (ownerSubtreeLeafElementID === null) {
            // If this is the first time we're stepping through the owners tree,
            // pin the current component as the owners list leaf.
            // This will enable us to step back down to this component.
            ownerSubtreeLeafElementID = selectedElementID;
          }

          const selectedElement = store.getElementAtIndex(selectedElementIndex);

          if (selectedElement !== null && selectedElement.ownerID !== 0) {
            const ownerIndex = store.getIndexOfElementID(selectedElement.ownerID);

            if (ownerIndex !== null) {
              selectedElementIndex = ownerIndex;
            }
          }
        }

        break;

      case 'SELECT_PARENT_ELEMENT_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex !== null) {
          const selectedElement = store.getElementAtIndex(selectedElementIndex);

          if (selectedElement !== null && selectedElement.parentID !== 0) {
            const parentIndex = store.getIndexOfElementID(selectedElement.parentID);

            if (parentIndex !== null) {
              selectedElementIndex = parentIndex;
            }
          }
        }

        break;

      case 'SELECT_PREVIOUS_ELEMENT_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex === null || selectedElementIndex === 0) {
          selectedElementIndex = numElements - 1;
        } else {
          selectedElementIndex--;
        }

        break;

      case 'SELECT_PREVIOUS_SIBLING_IN_TREE':
        ownerSubtreeLeafElementID = null;

        if (selectedElementIndex !== null) {
          const selectedElement = store.getElementAtIndex(selectedElementIndex);

          if (selectedElement !== null && selectedElement.parentID !== 0) {
            const parent = store.getElementByID(selectedElement.parentID);

            if (parent !== null) {
              const {
                children
              } = parent;
              const selectedChildIndex = children.indexOf(selectedElement.id);
              const nextChildID = selectedChildIndex > 0 ? children[selectedChildIndex - 1] : children[children.length - 1];
              selectedElementIndex = store.getIndexOfElementID(nextChildID);
            }
          }
        }

        break;

      case 'SELECT_PREVIOUS_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE':
        {
          const elementIndicesWithErrorsOrWarnings = store.getElementsWithErrorsAndWarnings();

          if (elementIndicesWithErrorsOrWarnings.length === 0) {
            return state;
          }

          let flatIndex = 0;

          if (selectedElementIndex !== null) {
            // Resume from the current position in the list.
            // Otherwise step to the previous item, relative to the current selection.
            for (let i = elementIndicesWithErrorsOrWarnings.length - 1; i >= 0; i--) {
              const {
                index
              } = elementIndicesWithErrorsOrWarnings[i];

              if (index >= selectedElementIndex) {
                flatIndex = i;
              } else {
                break;
              }
            }
          }

          let prevEntry;

          if (flatIndex === 0) {
            prevEntry = elementIndicesWithErrorsOrWarnings[elementIndicesWithErrorsOrWarnings.length - 1];
            selectedElementID = prevEntry.id;
            selectedElementIndex = prevEntry.index;
          } else {
            prevEntry = elementIndicesWithErrorsOrWarnings[flatIndex - 1];
            selectedElementID = prevEntry.id;
            selectedElementIndex = prevEntry.index;
          }

          lookupIDForIndex = false;
          break;
        }

      case 'SELECT_NEXT_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE':
        {
          const elementIndicesWithErrorsOrWarnings = store.getElementsWithErrorsAndWarnings();

          if (elementIndicesWithErrorsOrWarnings.length === 0) {
            return state;
          }

          let flatIndex = -1;

          if (selectedElementIndex !== null) {
            // Resume from the current position in the list.
            // Otherwise step to the next item, relative to the current selection.
            for (let i = 0; i < elementIndicesWithErrorsOrWarnings.length; i++) {
              const {
                index
              } = elementIndicesWithErrorsOrWarnings[i];

              if (index <= selectedElementIndex) {
                flatIndex = i;
              } else {
                break;
              }
            }
          }

          let nextEntry;

          if (flatIndex >= elementIndicesWithErrorsOrWarnings.length - 1) {
            nextEntry = elementIndicesWithErrorsOrWarnings[0];
            selectedElementID = nextEntry.id;
            selectedElementIndex = nextEntry.index;
          } else {
            nextEntry = elementIndicesWithErrorsOrWarnings[flatIndex + 1];
            selectedElementID = nextEntry.id;
            selectedElementIndex = nextEntry.index;
          }

          lookupIDForIndex = false;
          break;
        }

      default:
        // React can bailout of no-op updates.
        return state;
    }
  } // Keep selected item ID and index in sync.


  if (lookupIDForIndex && selectedElementIndex !== state.selectedElementIndex) {
    if (selectedElementIndex === null) {
      selectedElementID = null;
    } else {
      selectedElementID = store.getElementIDAtIndex(selectedElementIndex);
    }
  }

  return { ...state,
    numElements,
    ownerSubtreeLeafElementID,
    selectedElementIndex,
    selectedElementID
  };
}