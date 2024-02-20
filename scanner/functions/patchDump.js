function patchDump(dump){
    addArchivesToDump(window.state.archives, dump);
    addDaterangeToDump(window.state.daterange || {}, dump)

}