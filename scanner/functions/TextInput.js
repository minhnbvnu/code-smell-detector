function TextInput(name = "Text", defaultValue = "", realTime = false) {
  if (!(name in GUIState)) { GUIState[name] = defaultValue; }
  postMessage({ "type": "addTextbox", payload: { name: name, default: defaultValue, realTime: realTime } });
  return GUIState[name];
}