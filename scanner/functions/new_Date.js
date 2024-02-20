function new_Date() {
  return {
    getTime: function() {
      mock_date_time_counter += 16;
      return mock_date_time_counter;
    }
  };
}