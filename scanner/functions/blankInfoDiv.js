function blankInfoDiv() {
  return $(`
    <div class="BRfloat BRinfo">
      <div class="BRfloatHead">About this book
        <button class="floatShut" href="javascript:;" onclick="$.fn.colorbox.close();"><span class="br-colorbox-shift">Close</span></button>
      </div>
      <div class="BRfloatBody">
        <div class="BRfloatCover"></div>
        <div class="BRfloatMeta">
          <div class="BRfloatTitle">
            <h2><a /></h2>
          </div>
        </div>
      </div>
      <div class="BRfloatFoot">
        <a href="https://openlibrary.org/dev/docs/bookreader">About the BookReader</a>
      </div>
    </div>`);
}