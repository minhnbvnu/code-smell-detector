function timelineToCsvWithUI(){
    csv_data = "event_date(UTC),event_title,event_description,event_tz,event_date_wtz,event_category,event_tags,linked_assets,linked_iocs,created_by,creation_date\n";
    for (index in current_timeline) {

        item = current_timeline[index];
        content = item.event_content.replace(/"/g, '\"');
        content_parsed = content.replace(/(\r?\n)+/g, ' - ');
        title = item.event_title.replace(/"/g, '\"');
        tags = item.event_tags.replace(/"/g, '\"');
        assets = "";
        for (k in item.assets) {
            asset = item.assets[k].name.replace(/"/g, '\"');
            assets += `${asset};`;
        }
        iocs = "";
        for (k in item.iocs) {
            ioc = item.iocs[k].name.replace(/"/g, '\"');
            iocs += `${ioc};`;
        }
        csv_data += `"${item.event_date}","${title}","${content_parsed}","${item.event_tz}","${item.event_date_wtz}","${item.category_name}","${tags}","${assets}","${iocs}","${item.user}","${item.event_added}"\n`;
    }
    download_file("iris_timeline.csv", "text/csv", csv_data);
}