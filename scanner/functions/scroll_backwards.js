function scroll_backwards() {
    if (chaos_logs_pos > 0){
        chaos_logs_pos = chaos_logs_pos -1;
        $('#current_log_pos').text(chaos_logs_pos);
        getChaosJobsLogs();
    } 
}