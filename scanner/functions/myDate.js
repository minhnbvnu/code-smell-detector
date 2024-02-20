function myDate(dateString) {
    const dateObj = new Date(dateString).toUTCString();
    const dateToShow = dateObj
      .split(" ")
      .slice(0, 4)
      .join(" ");

    return dateToShow;
  }