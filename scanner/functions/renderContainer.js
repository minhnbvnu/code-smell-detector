function renderContainer({ width }) {
    const Container = () => {
      const [params, containerRef] = useContainerQuery(query);
      return (
        <div data-testid="container" ref={containerRef} style={{ width }}>
          {params.mobile && 'mobile'}
          {params.desktop && 'desktop'}
        </div>
      );
    };

    return render(<Container />, $div);
  }