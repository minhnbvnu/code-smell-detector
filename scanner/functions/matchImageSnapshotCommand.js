function matchImageSnapshotCommand(defaultOptions) {
  return function matchImageSnapshot(subject, maybeName, commandOptions) {
    const options = {
      ...defaultOptions,
      ...((typeof maybeName === 'string' ? commandOptions : maybeName) || {}),
    };

    cy.task(MATCH, {
      screenshotsFolder,
      updateSnapshots,
      options,
    });

    const name = typeof maybeName === 'string' ? maybeName : undefined;
    const target = subject ? cy.wrap(subject) : cy;
    target.screenshot(name, options);

    return cy
      .task(RECORD)
      .then(
        ({
          pass,
          added,
          updated,
          diffSize,
          imageDimensions,
          diffRatio,
          diffPixelCount,
          diffOutputPath,
        }) => {
          if (!pass && !added && !updated) {
            const message = diffSize
              ? `Image size (${imageDimensions.baselineWidth}x${
                  imageDimensions.baselineHeight
                }) different than saved snapshot size (${
                  imageDimensions.receivedWidth
                }x${
                  imageDimensions.receivedHeight
                }).\nSee diff for details: ${diffOutputPath}`
              : `Image was ${diffRatio *
                  100}% different from saved snapshot with ${diffPixelCount} different pixels.\nSee diff for details: ${diffOutputPath}`;

            if (failOnSnapshotDiff) {
              throw new Error(message);
            } else {
              Cypress.log({ message });
            }
          }
        }
      );
  };
}