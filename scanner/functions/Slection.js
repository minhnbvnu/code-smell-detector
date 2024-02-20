function Slection({
  contextMenuType,
  tranboxSetting,
  transApis,
}) {
  const boxWidth = limitNumber(window.innerWidth, 300, 600);
  const boxHeight = limitNumber(window.innerHeight, 200, 400);

  const [showBox, setShowBox] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [selectedText, setSelText] = useState("");
  const [text, setText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxSize, setBoxSize] = useState({
    w: boxWidth,
    h: boxHeight,
  });
  const [boxPosition, setBoxPosition] = useState({
    x: (window.innerWidth - boxWidth) / 2,
    y: (window.innerHeight - boxHeight) / 2,
  });

  const handleClick = (e) => {
    e.stopPropagation();

    setShowBtn(false);
    setText(selectedText);
    setShowBox(true);
  };

  const handleTranbox = useCallback(() => {
    setShowBtn(false);

    const selectedText = window.getSelection()?.toString()?.trim() || "";
    if (!selectedText) {
      setShowBox((pre) => !pre);
      return;
    }

    setSelText(selectedText);
    setText(selectedText);
    setShowBox(true);
  }, []);

  useEffect(() => {
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

    // todo: mobile support
    window.addEventListener("mouseup", handleMouseup);
    // window.addEventListener(isMobile ? "touchend" : "mouseup", handleMouseup);
    return () => {
      window.removeEventListener(
        isMobile ? "touchend" : "mouseup",
        handleMouseup
      );
    };
  }, [tranboxSetting.hideTranBtn]);

  useEffect(() => {
    if (isExt) {
      return;
    }

    const clearShortcut = shortcutRegister(
      tranboxSetting.tranboxShortcut || DEFAULT_TRANBOX_SHORTCUT,
      handleTranbox
    );

    return () => {
      clearShortcut();
    };
  }, [tranboxSetting.tranboxShortcut, handleTranbox]);

  useEffect(() => {
    window.addEventListener(MSG_OPEN_TRANBOX, handleTranbox);
    return () => {
      window.removeEventListener(MSG_OPEN_TRANBOX, handleTranbox);
    };
  }, [handleTranbox]);

  useEffect(() => {
    if (!isGm) {
      return;
    }

    // 注册菜单
    try {
      const menuCommandIds = [];
      contextMenuType !== 0 &&
        menuCommandIds.push(
          GM.registerMenuCommand(
            "Translate Selected Text",
            (event) => {
              handleTranbox();
            },
            "S"
          )
        );

      return () => {
        menuCommandIds.forEach((id) => {
          GM.unregisterMenuCommand(id);
        });
      };
    } catch (err) {
      console.log("[registerMenuCommand]", err);
    }
  }, [handleTranbox, contextMenuType]);

  return (
    <>
      {showBox && (
        <TranBox
          text={text}
          setText={setText}
          boxSize={boxSize}
          setBoxSize={setBoxSize}
          boxPosition={boxPosition}
          setBoxPosition={setBoxPosition}
          tranboxSetting={tranboxSetting}
          transApis={transApis}
          setShowBox={setShowBox}
        />
      )}

      {showBtn && (
        <TranBtn
          position={position}
          tranboxSetting={tranboxSetting}
          onClick={handleClick}
        />
      )}
    </>
  );
}