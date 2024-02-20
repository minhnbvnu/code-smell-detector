function renderTree() {
      ReactDOM.render(
        <div ref={c => (GRANDPARENT = c)} {...GRANDPARENT_PROPS}>
          <div ref={c => (PARENT = c)} {...PARENT_PROPS}>
            <ChildWrapper {...CHILD_PROPS} />
          </div>
        </div>,
        container,
      );
    }