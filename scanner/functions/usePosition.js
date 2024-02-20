function usePosition() {
  const duration = useTypedSelector(getDuration);
  const timeElapsed = useTypedSelector(getTimeElapsed);
  const position = duration ? Math.floor(timeElapsed) / duration * 100 : 0;
  const scrubPosition = useTypedSelector(getUserInputScrubPosition);
  const userInputFocus = useTypedSelector(getUserInputFocus);
  const displayedPosition = userInputFocus === "position" ? scrubPosition : position;
  return [position, displayedPosition];
}