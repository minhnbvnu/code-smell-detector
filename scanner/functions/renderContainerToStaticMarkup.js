function renderContainerToStaticMarkup({ initialSize }) {
      const Container = () => {
        const [params, containerRef] = useContainerQuery(query, initialSize);
  
        return React.createElement(
          'div',
          {
            ref: containerRef
          },
          JSON.stringify(params)
        );
      };
  
      return renderToStaticMarkup(React.createElement(Container));
    }