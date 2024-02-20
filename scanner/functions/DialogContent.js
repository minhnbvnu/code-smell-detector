function DialogContent({
  unsupportedBridgeProtocol
}) {
  const {
    version,
    minNpmVersion,
    maxNpmVersion
  } = unsupportedBridgeProtocol;
  let instructions;

  if (maxNpmVersion === null) {
    const upgradeInstructions = `npm i -g react-devtools@^${minNpmVersion}`;
    instructions = /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("p", {
      className: UnsupportedBridgeProtocolDialog_default.a.Paragraph
    }, "To fix this, upgrade the DevTools NPM package:"), /*#__PURE__*/react["createElement"]("pre", {
      className: UnsupportedBridgeProtocolDialog_default.a.NpmCommand
    }, upgradeInstructions, /*#__PURE__*/react["createElement"](Button_Button, {
      onClick: () => Object(clipboard["copy"])(upgradeInstructions),
      title: "Copy upgrade command to clipboard"
    }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
      type: "copy"
    }))));
  } else {
    const downgradeInstructions = `npm i -g react-devtools@${maxNpmVersion}`;
    instructions = /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("p", {
      className: UnsupportedBridgeProtocolDialog_default.a.Paragraph
    }, "To fix this, downgrade the DevTools NPM package:"), /*#__PURE__*/react["createElement"]("pre", {
      className: UnsupportedBridgeProtocolDialog_default.a.NpmCommand
    }, downgradeInstructions, /*#__PURE__*/react["createElement"](Button_Button, {
      onClick: () => Object(clipboard["copy"])(downgradeInstructions),
      title: "Copy downgrade command to clipboard"
    }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
      type: "copy"
    }))));
  }

  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    className: UnsupportedBridgeProtocolDialog_default.a.Column
  }, /*#__PURE__*/react["createElement"]("div", {
    className: UnsupportedBridgeProtocolDialog_default.a.Title
  }, "Unsupported DevTools backend version"), /*#__PURE__*/react["createElement"]("p", {
    className: UnsupportedBridgeProtocolDialog_default.a.Paragraph
  }, "You are running ", /*#__PURE__*/react["createElement"]("code", null, "react-devtools"), " version", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: UnsupportedBridgeProtocolDialog_default.a.Version
  }, DEVTOOLS_VERSION), "."), /*#__PURE__*/react["createElement"]("p", {
    className: UnsupportedBridgeProtocolDialog_default.a.Paragraph
  }, "This requires bridge protocol", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: UnsupportedBridgeProtocolDialog_default.a.Version
  }, "version ", currentBridgeProtocol.version), ". However the current backend version uses bridge protocol", ' ', /*#__PURE__*/react["createElement"]("span", {
    className: UnsupportedBridgeProtocolDialog_default.a.Version
  }, "version ", version), "."), instructions, /*#__PURE__*/react["createElement"]("p", {
    className: UnsupportedBridgeProtocolDialog_default.a.Paragraph
  }, "Or", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: UnsupportedBridgeProtocolDialog_default.a.Link,
    href: INSTRUCTIONS_FB_URL,
    target: "_blank"
  }, "click here"), ' ', "for more information.")));
}