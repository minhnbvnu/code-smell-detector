function getField(field){
	return document.getElementById('input-'+field) || document.getElementById('number-'+field) || document.getElementById('float-'+field) || document.getElementById('checkbox-'+field) || document.getElementById('select-'+field) || document.getElementById('span-'+field) || document.getElementById(field)
}