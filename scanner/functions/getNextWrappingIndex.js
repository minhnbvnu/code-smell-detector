function getNextWrappingIndex(moveAmount,baseIndex,itemCount,getItemNodeFromIndex,circular){if(void 0===circular&&(circular=!0),0===itemCount)return-1;var itemsLastIndex=itemCount-1;("number"!=typeof baseIndex||baseIndex<0||baseIndex>=itemCount)&&(baseIndex=moveAmount>0?-1:itemsLastIndex+1);var newIndex=baseIndex+moveAmount;newIndex<0?newIndex=circular?itemsLastIndex:0:newIndex>itemsLastIndex&&(newIndex=circular?0:itemsLastIndex);var nonDisabledNewIndex=getNextNonDisabledIndex(moveAmount,newIndex,itemCount,getItemNodeFromIndex,circular);return-1===nonDisabledNewIndex?baseIndex>=itemCount?-1:baseIndex:nonDisabledNewIndex}