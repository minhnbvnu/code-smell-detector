function handleMouseDown(event){
    mousedown=true;
    getMouseCoordinates(event); //=> xUser, yUser, xPixUser, yPixUser
    xUserDown=xUser; // memorize starting point of mouse drag
    yUserDown=yUser;
    pickRoadOrObject(xUser,yUser);
}