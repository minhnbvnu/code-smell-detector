function setLogConsole() {
    if (log_tail_switch) {
      $("#logConsoleButton").text("Start Logs Tail");
      $('#alert_placeholder3').replaceWith(alert_div_webtail + 'Stopping log tail...</div>');
      log_tail_switch = false;
      disableLogTail();
    } else {
      $('#alert_placeholder3').replaceWith(alert_div_webtail + 'Starting log tail...</div>');
      $("#logConsoleButton").text("Stop Logs Tail");
      log_tail_switch = true;
      log_tail_div.style.display = "block";
      log_tail_screen.style.display = "block"
      setLogRegex();
      enableLogTail();
      getChaosJobsLogs();
    }
  }