function setRecord(isRecording)
{
	document.getElementById('record').innerHTML = isRecording ? '<font color="red">Record</font>' : '<font color="gray">Record</font>';
}