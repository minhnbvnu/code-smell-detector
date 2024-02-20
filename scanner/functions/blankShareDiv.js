function blankShareDiv() {
  return $(`
    <div class="BRfloat BRshare">
      <div class="BRfloatHead">
        Share
        <button class="floatShut" href="javascript:;" onclick="$.fn.colorbox.close();"><span class="br-colorbox-shift">Close</span></button>
      </div>
    </div>`);
}