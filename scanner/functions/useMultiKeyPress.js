function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  function downHandler({ key }) {
    setKeyPressed(keysPressed.add(key));
  }

  const upHandler = ({ key }) => {
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  };

  // Add event listeners
  useEventListener('keydown', downHandler);
  useEventListener('keyup', upHandler);

  return keysPressed;
}