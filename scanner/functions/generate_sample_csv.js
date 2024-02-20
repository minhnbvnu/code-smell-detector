function generate_sample_csv(){
    csv_data = "ioc_value,ioc_type,ioc_description,ioc_tags,ioc_tlp\n"
    csv_data += "1.1.1.1,ip-dst,Cloudflare DNS IP address,Cloudflare|DNS,green\n"
    csv_data += "wannacry.exe,filename,Wannacry sample found,Wannacry|Malware|PE,amber"
    download_file("sample_iocs.csv", "text/csv", csv_data);
}