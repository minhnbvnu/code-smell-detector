function init_changes() {
      let changebase = {};
      changebase.is_daylight = (aComponent.name == "daylight");
      changebase.utcOffset = convert_tzoffset(
        aComponent.getFirstProperty("tzoffsetto").getFirstValue()
      );

      changebase.prevUtcOffset = convert_tzoffset(
        aComponent.getFirstProperty("tzoffsetfrom").getFirstValue()
      );

      return changebase;
    }