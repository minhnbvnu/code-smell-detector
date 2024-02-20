function mandreel_call_constructors(_ptr, size,stackPos)
{
var ptr = _ptr;

ptr = ptr >> 2;

for (var i=0;i<size;++i)
{


var tag = heap32[ptr];
var ptr_id = heap32[ptr+1];

__FUNCTION_TABLE__[(ptr_id)>>2](stackPos);

ptr+=2;

}
}