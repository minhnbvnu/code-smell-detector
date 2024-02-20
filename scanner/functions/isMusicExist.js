function isMusicExist(musicData,array) {
   return array.some((item)=>{
        return item.mid === musicData.mid;
    });
}