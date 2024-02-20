function getPrunePath(props) {
        var validPropsString = typeof props === "string" && props !== undefined && props !== "";
        return validPropsString ? props.split(/ +/) : [];
      }