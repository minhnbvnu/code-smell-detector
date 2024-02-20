function TranBox({
  text,
  setText,
  setShowBox,
  tranboxSetting,
  transApis,
  boxSize,
  setBoxSize,
  boxPosition,
  setBoxPosition,
}) {
  return (
    <SettingProvider>
      <ThemeProvider>
        <DraggableResizable
          defaultPosition={boxPosition}
          defaultSize={boxSize}
          header={<Header setShowPopup={setShowBox} />}
          onChangeSize={setBoxSize}
          onChangePosition={setBoxPosition}
        >
          <Divider />
          <TranForm
            text={text}
            setText={setText}
            tranboxSetting={tranboxSetting}
            transApis={transApis}
          />
        </DraggableResizable>
      </ThemeProvider>
    </SettingProvider>
  );
}