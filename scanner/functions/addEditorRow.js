function addEditorRow(container, left, right){
	var tr=document.createElement('tr');
	tr.appendChild(document.createElement('td'));
	tr.appendChild(document.createElement('td'));

	tr.children[1].className='text-right';
	if(right){
		tr.children[0].appendChild(label(right.id, left));
		tr.children[1].appendChild(right);
	}else{
		tr.children[0].innerHTML=left;
	}
	container.appendChild(tr);
}