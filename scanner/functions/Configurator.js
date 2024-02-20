function Configurator({ selectedStartTab, urlId }) {
  const [selectedTab, setSelectedTab] = useState(selectedStartTab);
  const [selectedFeatures, setSelectedFeatures] = useState(
    getSelectedFeatures(selectedTab, urlId)
  );

  useEffect(() => {
    setSelectedFeatures(getSelectedFeatures(selectedTab, urlId));
  }, [urlId, selectedTab]);

  const [hoverFeature, setHoverFeature] = useState('');
  const [projectName, setProjectName] = useState('empty-project');

  const { featureConfig, projectGeneratorFunction, defaultFile } =
    buildConfigConfig[selectedTab];

  const selectedArray = getSelectedArray(selectedFeatures);

  function onMouseEnterFeature(feature) {
    setHoverFeature(feature);
  }
  function onMouseLeaveFeature() {
    setHoverFeature(null);
  }

  function validateProjectName(name) {
    // TODO
    // Consider splitting project name and directory name
    // into separate fields to not restrict npm package
    // names from using / and possibly other characters.

    // Whitelist allowed characters and only accept those
    // to prevent use of characters that isn't allowed in
    // directory names.
    // Valid characters:
    //  * a-z
    //  * 0-9
    //  * underscore _
    //  * dash -
    //  * dot .
    //
    // Uppercase letters not whitelisted because it's not valid
    // in npm package names
    const whitelistRegex = /^[a-z0-9_.-]+$/;
    const isValidCharacters = whitelistRegex.test(name);
    if (!isValidCharacters && name) return;

    // Use validation function from third party library
    // to check if the name is a valid npm package name.
    // The whitelist above only makes sure that no invalid
    // characters for directory names is present in the name
    // so this is needed too because the project name is used
    // as both the directory name and in package.json
    const isValidNpmPackage = validate(name);
    if (isValidNpmPackage) {
      // All validation succeeded so we set the new project name
      setProjectName(name);
    }
  }
  function joyrideCallback({ lifecycle, step: { target } }) {
    if (lifecycle === 'tooltip') {
      trackHelpClick(target);
    }
  }

  function downloadZip() {
    projectGeneratorFunction(
      selectedArray,
      projectName,
      npmVersionPromise
    ).then((res) => {
      const zip = new jszip();
      _.forEach(res, (content, file) => {
        zip.file(file, content);
      });

      zip.generateAsync({ type: 'blob' }).then(function (blob) {
        saveAs(
          blob,
          `${
            projectName || getDefaultProjectName('empty-project', selectedArray)
          }.zip`
        );
      });
    });
  }

  const newBabelConfig = createBabelConfig(selectedArray);

  const isReact = _.includes(selectedArray, 'react');
  const isTypescript = _.includes(selectedArray, 'typescript');

  const showFeatures = _.clone(featureConfig.features);

  if (!isReact) {
    delete showFeatures['react-hot-loader'];
    delete showFeatures['material-ui'];
  }

  if (isTypescript) {
    delete showFeatures.eslint;
  }

  return (
    <>
      <Joyride steps={onboardingHelp} continuous callback={joyrideCallback} />
      <div>
        <Tabs
          selected={selectedTab}
          setSelected={(newSelectedTab) => {
            const newSelectedFeatures = getFeaturesForNewTab(
              newSelectedTab,
              selectedFeatures
            );
            setSelectedFeatures(newSelectedFeatures);
            setSelectedTab(newSelectedTab);

            const newUrl = toUrl(newSelectedTab, newSelectedFeatures);
            window.history.replaceState(null, null, newUrl);
          }}
        />

        <div className={styles.mainContainer}>
          <div className={styles.featuresContainer}>
            <Features
              features={showFeatures}
              selected={urlId ? selectedFeatures : []} //reduce flicker on page load
              setSelected={(feature) => {
                const newSelectedFeatures = getNewFeaturesForNewSelectedFeature(
                  selectedTab,
                  selectedFeatures,
                  feature
                );
                setSelectedFeatures(newSelectedFeatures);
                const newUrl = toUrl(selectedTab, newSelectedFeatures);
                window.history.replaceState(null, null, newUrl);
              }}
              onMouseEnter={onMouseEnterFeature}
              onMouseLeave={onMouseLeaveFeature}
              selectedBuildTool={selectedTab}
            />
            <div className={styles.desktopOnly}>
              <div className={styles.projectNameHelp}>
                <label className={styles.projectName} htmlFor="project-name">
                  Project name
                </label>
                <FeatureHelp
                  featureName="project name"
                  selectedBuildTool={selectedTab}
                />
              </div>
              <input
                type="text"
                id="project-name"
                name="project-name"
                value={projectName}
                onChange={(e) => validateProjectName(e.target.value)}
                className={styles.projectNameInput}
              />
              <DownloadButton
                buildTool={selectedTab}
                filename={`${projectName}.zip`}
                onClick={(e) => {
                  downloadZip();
                  trackDownload(selectedTab, selectedArray);
                }}
              />
            </div>
            {buildConfigConfig[selectedTab].extraElements}
            <br />
          </div>
          <div className={styles.codeContainer}>
            <FileBrowser
              projectGeneratorFunction={projectGeneratorFunction}
              featureConfig={featureConfig}
              features={selectedArray}
              highlightFeature={hoverFeature}
              defaultFile={defaultFile}
              projectName={projectName}
            />
            <br />
            <div className={styles.smallScreensOnly}>
              <div className={styles.projectNameHelp}>
                <label
                  className={styles.projectName}
                  htmlFor="project-name-small"
                >
                  Project name
                </label>
                <FeatureHelp
                  featureName="project name"
                  selectedBuildTool={selectedTab}
                />
              </div>
              <input
                type="text"
                id="project-name-small"
                name="project-name"
                value={projectName}
                onChange={(e) => validateProjectName(e.target.value)}
                className={styles.projectNameInput}
              />
              <DownloadButton
                buildTool={selectedTab}
                filename={`${projectName}.zip`}
                onClick={(e) => {
                  downloadZip();
                  trackDownload(selectedTab, selectedArray);
                }}
              />
            </div>
          </div>
        </div>
        <DocsViewer
          hoverFeature={hoverFeature}
          selectedFeatures={selectedArray}
          buildTool={selectedTab}
        />
        <div className={styles.container} id="step-by-step-instructions">
          <StepByStepArea
            features={selectedArray}
            newBabelConfig={newBabelConfig}
            isReact={isReact}
            bundler={selectedTab}
          />
        </div>
      </div>
    </>
  );
}