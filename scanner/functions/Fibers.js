function Fibers({fibers, show, graphSettings, ...rest}) {
  const items = Object.keys(fibers.descriptions).map(
    id => fibers.descriptions[id]
  );

  const isDragging = rest.className.indexOf('dragging') > -1;
  const [_, sdx, sdy] =
    rest.style.transform.match(/translate\((-?\d+)px,(-?\d+)px\)/) || [];
  const dx = Number(sdx);
  const dy = Number(sdy);

  return (
    <div
      {...rest}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        ...rest.style,
        transform: null,
      }}>
      <Graph
        className="graph"
        dx={dx}
        dy={dy}
        isDragging={isDragging}
        settings={graphSettings}>
        {items.map(fiber => [
          <Vertex
            key={fiber.id}
            width={150}
            height={100}
            isActive={fiber.id === fibers.workInProgressID}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: getFiberColor(fibers, fiber.id),
              }}
              title={
                /*prettyFormat(fiber, { plugins: [reactElement ]})*/
                'todo: this was hanging last time I tried to pretty print'
              }>
              <small>
                {fiber.tag} #{fiber.id}
              </small>
              <br />
              {fiber.type}
              <br />
              {fibers.currentIDs.indexOf(fiber.id) === -1 ? (
                <small>
                  {fiber.pendingWorkPriority !== 0 && [
                    <span key="span">
                      Needs: {formatPriority(fiber.pendingWorkPriority)}
                    </span>,
                    <br key="br" />,
                  ]}
                  {fiber.memoizedProps !== null &&
                    fiber.pendingProps !== null && [
                      fiber.memoizedProps === fiber.pendingProps
                        ? 'Can reuse memoized.'
                        : 'Cannot reuse memoized.',
                      <br key="br" />,
                    ]}
                </small>
              ) : (
                <small>Committed</small>
              )}
              {fiber.flags && [
                <br key="br" />,
                <small key="small">Effect: {fiber.flags}</small>,
              ]}
            </div>
          </Vertex>,
          fiber.child && show.child && (
            <Edge
              source={fiber.id}
              target={fiber.child}
              kind="child"
              weight={1000}
              key={`${fiber.id}-${fiber.child}-child`}>
              child
            </Edge>
          ),
          fiber.sibling && show.sibling && (
            <Edge
              source={fiber.id}
              target={fiber.sibling}
              kind="sibling"
              weight={2000}
              key={`${fiber.id}-${fiber.sibling}-sibling`}>
              sibling
            </Edge>
          ),
          fiber.return && show.return && (
            <Edge
              source={fiber.id}
              target={fiber.return}
              kind="return"
              weight={1000}
              key={`${fiber.id}-${fiber.return}-return`}>
              return
            </Edge>
          ),
          fiber.nextEffect && show.fx && (
            <Edge
              source={fiber.id}
              target={fiber.nextEffect}
              kind="fx"
              weight={100}
              key={`${fiber.id}-${fiber.nextEffect}-nextEffect`}>
              nextFx
            </Edge>
          ),
          fiber.firstEffect && show.fx && (
            <Edge
              source={fiber.id}
              target={fiber.firstEffect}
              kind="fx"
              weight={100}
              key={`${fiber.id}-${fiber.firstEffect}-firstEffect`}>
              firstFx
            </Edge>
          ),
          fiber.lastEffect && show.fx && (
            <Edge
              source={fiber.id}
              target={fiber.lastEffect}
              kind="fx"
              weight={100}
              key={`${fiber.id}-${fiber.lastEffect}-lastEffect`}>
              lastFx
            </Edge>
          ),
          fiber.alternate && show.alt && (
            <Edge
              source={fiber.id}
              target={fiber.alternate}
              kind="alt"
              weight={10}
              key={`${fiber.id}-${fiber.alternate}-alt`}>
              alt
            </Edge>
          ),
        ])}
      </Graph>
    </div>
  );
}