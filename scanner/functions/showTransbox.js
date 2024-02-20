function showTransbox({
  contextMenuType,
  tranboxSetting = DEFAULT_TRANBOX_SETTING,
  transApis,
}) {
  if (!tranboxSetting?.transOpen) {
    return;
  }

  const $tranbox = document.createElement("div");
  $tranbox.setAttribute("id", "kiss-transbox");
  document.body.parentElement.appendChild($tranbox);
  const shadowContainer = $tranbox.attachShadow({ mode: "closed" });
  const emotionRoot = document.createElement("style");
  const shadowRootElement = document.createElement("div");
  shadowContainer.appendChild(emotionRoot);
  shadowContainer.appendChild(shadowRootElement);
  const cache = createCache({
    key: "kiss-transbox",
    prepend: true,
    container: emotionRoot,
  });
  ReactDOM.createRoot(shadowRootElement).render(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <Slection
          contextMenuType={contextMenuType}
          tranboxSetting={tranboxSetting}
          transApis={transApis}
        />
      </CacheProvider>
    </React.StrictMode>
  );
}