function FunctionChildWithWrongContext(props) {
        return (
          <div id="statelessWrongChild">
            <Consumer>{text => text}</Consumer>
          </div>
        );
      }