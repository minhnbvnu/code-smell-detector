function inputTranslate ({
  inputRule: {
    transOpen,
    triggerShortcut,
    translator,
    fromLang,
    toLang,
    triggerCount,
    triggerTime,
    transSign,
  } = DEFAULT_INPUT_RULE,
  transApis,
  detectRemote,
}) {
  if (!transOpen) {
    return;
  }

  const apiSetting = transApis?.[translator] || DEFAULT_TRANS_APIS[translator];
  if (triggerShortcut.length === 0) {
    triggerShortcut = DEFAULT_INPUT_SHORTCUT;
    triggerCount = 1;
  }

  stepShortcutRegister(
    triggerShortcut,
    async () => {
      let node = document.activeElement;

      if (!node) {
        return;
      }

      while (node.shadowRoot) {
        node = node.shadowRoot.activeElement;
      }

      if (!isInputNode(node) && !isEditAbleNode(node)) {
        return;
      }

      let initText = getNodeText(node);
      if (triggerShortcut.length === 1 && triggerShortcut[0].length === 1) {
        // todo: remove multiple char
        initText = removeEndchar(initText, triggerShortcut[0], triggerCount);
      }
      if (!initText.trim()) {
        return;
      }

      let text = initText;
      if (transSign) {
        const res = matchInputStr(text, transSign);
        if (res) {
          let lang = res[1];
          if (lang === "zh" || lang === "cn") {
            lang = "zh-CN";
          } else if (lang === "tw" || lang === "hk") {
            lang = "zh-TW";
          }
          if (lang && OPT_LANGS_LIST.includes(lang)) {
            toLang = lang;
          }
          text = res[2];
        }
      }

      // console.log("input -->", text);

      const loadingId = "kiss-" + genEventName();
      try {
        addLoading(node, loadingId);

        const deLang = await tryDetectLang(text, detectRemote);
        if (deLang && toLang.includes(deLang)) {
          return;
        }

        const [trText, isSame] = await apiTranslate({
          translator,
          text,
          fromLang,
          toLang,
          apiSetting,
        });
        if (!trText || isSame) {
          return;
        }

        if (isInputNode(node)) {
          node.value = trText;
          node.dispatchEvent(
            new Event("input", { bubbles: true, cancelable: true })
          );
          return;
        }

        selectContent(node);
        await sleep(200);

        pasteContentEvent(node, trText);
        await sleep(200);

        // todo: use includes?
        if (getNodeText(node).startsWith(initText)) {
          pasteContentCommand(node, trText);
          await sleep(100);
        } else {
          collapseToEnd(node);
        }
      } catch (err) {
        console.log("[translate input]", err.message);
      } finally {
        removeLoading(node, loadingId);
      }
    },
    triggerCount,
    triggerTime
  );
}