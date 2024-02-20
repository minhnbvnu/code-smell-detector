function setupConsole(){
	consolebox=document.getElementById('consolebox');
	consolebox.onkeypress=function(e){consolegetc=e.charCode || e.keyCode;};
}