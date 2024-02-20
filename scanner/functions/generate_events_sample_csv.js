function generate_events_sample_csv(){
    csv_data = "event_date,event_tz,event_title,event_category,event_content,event_raw,event_source,event_assets,event_iocs,event_tags\n"
    csv_data += '"2023-03-26T03:00:30.000","+00:00","An event","Unspecified","Event description","raw","source","","","defender|malicious"\n'
    csv_data += '"2023-03-26T03:00:35.000","+00:00","An event","Legitimate","Event description","raw","source","","","defender|malicious"\n'
    download_file("sample_events.csv", "text/csv", csv_data);
}