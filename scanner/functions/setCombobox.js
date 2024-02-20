function setCombobox(boxname,index){
  var combobox=document.getElementById(boxname);
  console.log("combobox=",combobox);
  combobox.selectedIndex=index;
}