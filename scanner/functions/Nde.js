function Nde(e,t,r){switch(t.tag){case 3:pW(t),Qc();break;case 5:jj(t);break;case 1:Li(t.type)&&$g(t);break;case 4:GT(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,i=t.memoizedProps.value;$r(Sg,n._currentValue),n._currentValue=i;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?($r(Nr,Nr.current&1),t.flags|=128,null):r&t.child.childLanes?mW(e,t,r):($r(Nr,Nr.current&1),e=go(e,t,r),e!==null?e.sibling:null);$r(Nr,Nr.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return gW(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),$r(Nr,Nr.current),n)break;return null;case 22:case 23:return t.lanes=0,fW(e,t,r)}return go(e,t,r)}