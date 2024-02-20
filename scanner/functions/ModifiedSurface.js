function ModifiedSurface (Surface) {
  class _ModifiedSurface extends Surface {
    constructor (parent, props, options) {
      super(parent, _monkeyPatchSurfaceProps(parent, props), options)
    }

    setProps (newProps) {
      return super.setProps(_monkeyPatchSurfaceProps(this.parent, newProps))
    }
  }
  return _ModifiedSurface
}