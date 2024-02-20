function SetResultTime() {
        gEndDate = new Date();
        lblTiming.innerHTML = ((gEndDate - gStartDate) / 1000).toString();
    }