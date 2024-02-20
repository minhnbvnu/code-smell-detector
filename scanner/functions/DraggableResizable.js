function DraggableResizable({
  header,
  children,
  defaultPosition = {
    x: 0,
    y: 0,
  },
  defaultSize = {
    w: 600,
    h: 400,
  },
  minSize = {
    w: 300,
    h: 200,
  },
  maxSize = {
    w: 1200,
    h: 1200,
  },
  onChangeSize,
  onChangePosition,
}) {
  const lineWidth = 4;
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);

  const opts = {
    size,
    setSize,
    position,
    setPosition,
    minSize,
    maxSize,
  };

  useEffect(() => {
    onChangeSize && onChangeSize(size);
  }, [size, onChangeSize]);

  useEffect(() => {
    onChangePosition && onChangePosition(position);
  }, [position, onChangePosition]);

  return (
    <Box
      style={{
        touchAction: "none",
        position: "fixed",
        left: position.x,
        top: position.y,
        display: "grid",
        gridTemplateColumns: `${lineWidth * 2}px auto ${lineWidth * 2}px`,
        gridTemplateRows: `${lineWidth * 2}px auto ${lineWidth * 2}px`,
        zIndex: 2147483647,
      }}
    >
      <Pointer
        direction="TopLeft"
        style={{
          transform: `translate(${lineWidth}px, ${lineWidth}px)`,
          cursor: "nw-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="Top"
        style={{
          margin: `0 ${lineWidth}px`,
          transform: `translate(0px, ${lineWidth}px)`,
          cursor: "row-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="TopRight"
        style={{
          transform: `translate(-${lineWidth}px, ${lineWidth}px)`,
          cursor: "ne-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="Left"
        style={{
          margin: `${lineWidth}px 0`,
          transform: `translate(${lineWidth}px, 0px)`,
          cursor: "col-resize",
        }}
        {...opts}
      />
      <Paper elevation={4}>
        <Pointer direction="Header" style={{ cursor: "move" }} {...opts}>
          {header}
        </Pointer>
        <div
          style={{
            width: size.w,
            height: size.h,
            overflow: "hidden auto",
          }}
        >
          {children}
        </div>
      </Paper>
      <Pointer
        direction="Right"
        style={{
          margin: `${lineWidth}px 0`,
          transform: `translate(-${lineWidth}px, 0px)`,
          cursor: "col-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="BottomLeft"
        style={{
          transform: `translate(${lineWidth}px, -${lineWidth}px)`,
          cursor: "ne-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="Bottom"
        style={{
          margin: `0 ${lineWidth}px`,
          transform: `translate(0px, -${lineWidth}px)`,
          cursor: "row-resize",
        }}
        {...opts}
      />
      <Pointer
        direction="BottomRight"
        style={{
          transform: `translate(-${lineWidth}px, -${lineWidth}px)`,
          cursor: "nw-resize",
        }}
        {...opts}
      />
    </Box>
  );
}