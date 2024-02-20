function printStore(store, includeWeight = false, state = null) {
  const snapshotLines = [];
  let rootWeight = 0;

  function printSelectedMarker(index) {
    if (state === null) {
      return '';
    }

    return state.selectedElementIndex === index ? `→` : ' ';
  }

  function printErrorsAndWarnings(element) {
    const {
      errorCount,
      warningCount
    } = store.getErrorAndWarningCountForElementID(element.id);

    if (errorCount === 0 && warningCount === 0) {
      return '';
    }

    return ` ${errorCount > 0 ? '✕' : ''}${warningCount > 0 ? '⚠' : ''}`;
  }

  const ownerFlatTree = state !== null ? state.ownerFlatTree : null;

  if (ownerFlatTree !== null) {
    snapshotLines.push('[owners]' + (includeWeight ? ` (${ownerFlatTree.length})` : ''));
    ownerFlatTree.forEach((element, index) => {
      const printedSelectedMarker = printSelectedMarker(index);
      const printedElement = printElement(element, false);
      const printedErrorsAndWarnings = printErrorsAndWarnings(element);
      snapshotLines.push(`${printedSelectedMarker}${printedElement}${printedErrorsAndWarnings}`);
    });
  } else {
    const errorsAndWarnings = store._errorsAndWarnings;

    if (errorsAndWarnings.size > 0) {
      let errorCount = 0;
      let warningCount = 0;
      errorsAndWarnings.forEach(entry => {
        errorCount += entry.errorCount;
        warningCount += entry.warningCount;
      });
      snapshotLines.push(`✕ ${errorCount}, ⚠ ${warningCount}`);
    }

    store.roots.forEach(rootID => {
      const {
        weight
      } = store.getElementByID(rootID);
      const maybeWeightLabel = includeWeight ? ` (${weight})` : ''; // Store does not (yet) expose a way to get errors/warnings per root.

      snapshotLines.push(`[root]${maybeWeightLabel}`);

      for (let i = rootWeight; i < rootWeight + weight; i++) {
        const element = store.getElementAtIndex(i);

        if (element == null) {
          throw Error(`Could not find element at index "${i}"`);
        }

        const printedSelectedMarker = printSelectedMarker(i);
        const printedElement = printElement(element, includeWeight);
        const printedErrorsAndWarnings = printErrorsAndWarnings(element);
        snapshotLines.push(`${printedSelectedMarker}${printedElement}${printedErrorsAndWarnings}`);
      }

      rootWeight += weight;
    }); // Make sure the pretty-printed test align with the Store's reported number of total rows.

    if (rootWeight !== store.numElements) {
      throw Error(`Inconsistent Store state. Individual root weights ("${rootWeight}") do not match total weight ("${store.numElements}")`);
    } // If roots have been unmounted, verify that they've been removed from maps.
    // This helps ensure the Store doesn't leak memory.


    store.assertExpectedRootMapSizes();
  }

  return snapshotLines.join('\n');
}