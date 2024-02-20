function changeMyHostNetID() {
    myHostNetID = generateNetID();
    localStorage.setItem('myHostNetID', myHostNetID);
    return myHostNetID;
}