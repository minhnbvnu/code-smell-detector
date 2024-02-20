async function handleMouseup(e) {
      e.stopPropagation();
      await sleep(10);

      const selectedText = window.getSelection()?.toString()?.trim() || "";
      setSelText(selectedText);
      if (!selectedText) {
        setShowBtn(false);
        return;
      }

      const { pageX, pageY } = isMobile ? e.changedTouches[0] : e;
      !tranboxSetting.hideTranBtn && setShowBtn(true);
      // setPosition({ x: e.clientX, y: e.clientY });
      setPosition({ x: pageX, y: pageY });
    }