function Grandchild(props) {
        return (
          <div>
            <Consumer>{text => text}</Consumer>
          </div>
        );
      }