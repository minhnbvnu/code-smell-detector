function write_sst(data,name,opts){return(name.substr(-4)===".bin"?write_sst_bin:write_sst_xml)(data,opts)}