function getValidHarvestConfig() {
  return {
    report_period_ms: 5000,
    harvest_limits: {
      analytic_event_data: 833,
      custom_event_data: 833,
      error_event_data: 8,
      span_event_data: 300
    }
  }
}