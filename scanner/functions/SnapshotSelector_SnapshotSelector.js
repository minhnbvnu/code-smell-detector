function SnapshotSelector_SnapshotSelector(_) {
  const {
    isCommitFilterEnabled,
    minCommitDuration,
    rootID,
    selectedCommitIndex,
    selectCommitIndex
  } = Object(react["useContext"])(ProfilerContext);
  const {
    profilerStore
  } = Object(react["useContext"])(StoreContext);
  const {
    commitData
  } = profilerStore.getDataForRoot(rootID);
  const totalDurations = [];
  const commitTimes = [];
  commitData.forEach(commitDatum => {
    totalDurations.push(commitDatum.duration + (commitDatum.effectDuration || 0) + (commitDatum.passiveEffectDuration || 0));
    commitTimes.push(commitDatum.timestamp);
  });
  const filteredCommitIndices = Object(react["useMemo"])(() => commitData.reduce((reduced, commitDatum, index) => {
    if (!isCommitFilterEnabled || commitDatum.duration >= minCommitDuration) {
      reduced.push(index);
    }

    return reduced;
  }, []), [commitData, isCommitFilterEnabled, minCommitDuration]);
  const numFilteredCommits = filteredCommitIndices.length; // Map the (unfiltered) selected commit index to an index within the filtered data.

  const selectedFilteredCommitIndex = Object(react["useMemo"])(() => {
    if (selectedCommitIndex !== null) {
      for (let i = 0; i < filteredCommitIndices.length; i++) {
        if (filteredCommitIndices[i] === selectedCommitIndex) {
          return i;
        }
      }
    }

    return null;
  }, [filteredCommitIndices, selectedCommitIndex]); // TODO (ProfilerContext) This should be managed by the context controller (reducer).
  // It doesn't currently know about the filtered commits though (since it doesn't suspend).
  // Maybe this component should pass filteredCommitIndices up?

  if (selectedFilteredCommitIndex === null) {
    if (numFilteredCommits > 0) {
      selectCommitIndex(0);
    } else {
      selectCommitIndex(null);
    }
  } else if (selectedFilteredCommitIndex >= numFilteredCommits) {
    selectCommitIndex(numFilteredCommits === 0 ? null : numFilteredCommits - 1);
  }

  let label = null;

  if (numFilteredCommits > 0) {
    // $FlowFixMe[missing-local-annot]
    const handleCommitInputChange = event => {
      const value = parseInt(event.currentTarget.value, 10);

      if (!isNaN(value)) {
        const filteredIndex = Math.min(Math.max(value - 1, 0), // Snashots are shown to the user as 1-based
        // but the indices within the profiler data array ar 0-based.
        numFilteredCommits - 1);
        selectCommitIndex(filteredCommitIndices[filteredIndex]);
      }
    }; // $FlowFixMe[missing-local-annot]


    const handleClick = event => {
      event.currentTarget.select();
    }; // $FlowFixMe[missing-local-annot]


    const handleKeyDown = event => {
      switch (event.key) {
        case 'ArrowDown':
          viewPrevCommit();
          event.stopPropagation();
          break;

        case 'ArrowUp':
          viewNextCommit();
          event.stopPropagation();
          break;

        default:
          break;
      }
    };

    const input = /*#__PURE__*/react["createElement"]("input", {
      className: SnapshotSelector_default.a.Input,
      "data-testname": "SnapshotSelector-Input",
      type: "text",
      inputMode: "numeric",
      pattern: "[0-9]*",
      value: // $FlowFixMe[unsafe-addition] addition with possible null/undefined value
      selectedFilteredCommitIndex + 1,
      size: `${numFilteredCommits}`.length,
      onChange: handleCommitInputChange,
      onClick: handleClick,
      onKeyDown: handleKeyDown
    });
    label = /*#__PURE__*/react["createElement"](react["Fragment"], null, input, " / ", numFilteredCommits);
  }

  const viewNextCommit = () => {
    let nextCommitIndex = selectedFilteredCommitIndex + 1;

    if (nextCommitIndex === filteredCommitIndices.length) {
      nextCommitIndex = 0;
    }

    selectCommitIndex(filteredCommitIndices[nextCommitIndex]);
  };

  const viewPrevCommit = () => {
    let nextCommitIndex = selectedFilteredCommitIndex - 1;

    if (nextCommitIndex < 0) {
      nextCommitIndex = filteredCommitIndices.length - 1;
    }

    selectCommitIndex(filteredCommitIndices[nextCommitIndex]);
  }; // $FlowFixMe[missing-local-annot]


  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowLeft':
        viewPrevCommit();
        event.stopPropagation();
        break;

      case 'ArrowRight':
        viewNextCommit();
        event.stopPropagation();
        break;

      default:
        break;
    }
  };

  if (commitData.length === 0) {
    return null;
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("span", {
    className: SnapshotSelector_default.a.IndexLabel,
    "data-testname": "SnapshotSelector-Label"
  }, label), /*#__PURE__*/react["createElement"](Button_Button, {
    className: SnapshotSelector_default.a.Button,
    "data-testname": "SnapshotSelector-PreviousButton",
    disabled: numFilteredCommits === 0,
    onClick: viewPrevCommit,
    title: "Select previous commit"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "previous"
  })), /*#__PURE__*/react["createElement"]("div", {
    className: SnapshotSelector_default.a.Commits,
    onKeyDown: handleKeyDown,
    style: {
      flex: numFilteredCommits > 0 ? '1 1 auto' : '0 0 auto',
      maxWidth: numFilteredCommits > 0 ? numFilteredCommits * maxBarWidth : undefined
    },
    tabIndex: 0
  }, numFilteredCommits > 0 && /*#__PURE__*/react["createElement"](SnapshotCommitList_SnapshotCommitList, {
    commitData: commitData,
    commitTimes: commitTimes,
    filteredCommitIndices: filteredCommitIndices,
    selectedCommitIndex: selectedCommitIndex,
    selectedFilteredCommitIndex: selectedFilteredCommitIndex,
    selectCommitIndex: selectCommitIndex,
    totalDurations: totalDurations
  }), numFilteredCommits === 0 && /*#__PURE__*/react["createElement"]("div", {
    className: SnapshotSelector_default.a.NoCommits
  }, "No commits")), /*#__PURE__*/react["createElement"](Button_Button, {
    className: SnapshotSelector_default.a.Button,
    "data-testname": "SnapshotSelector-NextButton",
    disabled: numFilteredCommits === 0,
    onClick: viewNextCommit,
    title: "Select next commit"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "next"
  })));
}