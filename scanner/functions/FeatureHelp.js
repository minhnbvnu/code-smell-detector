function FeatureHelp({ featureName, selectedBuildTool }) {
  const [modalOpen, setModalOpen] = useState(false);
  const helpText = docsMap(selectedBuildTool)[featureName];
  if (!helpText) {
    return null;
  }
  return (
    <div>
      <button
        onClick={() => {
          trackHelpIconClick(featureName);
          setModalOpen(true);
        }}
        className={styles.helpCircle}
      >
        ?
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal"
        contentLabel="Help"
      >
        <h2 style={{ width: '90%', float: 'left' }}>Help for {featureName}</h2>
        <button
          style={{ borderRadius: '100px', float: 'left' }}
          onClick={() => setModalOpen(false)}
        >
          X
        </button>
        <br />
        <br />
        {helpText}
      </Modal>
    </div>
  );
}