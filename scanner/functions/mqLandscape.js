function mqLandscape(){
    //return window.matchMedia( "(min-aspect-ratio: 6/5)").matches; // unreliable
    return window.innerWidth>aspectRatioCrit*window.innerHeight;
}