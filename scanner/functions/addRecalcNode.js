function addRecalcNode(nn){
       if(nn==ngnd) return;
       if(nn==npwr) return;
       if(recalcHash[nn] == 1)return; 
       recalclist.push(nn);
       recalcHash[nn] = 1;
}