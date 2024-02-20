function VueHead (Vue, options) {
    if (installed) return

    installed = true

    if (options) {
      Vue.util.extend(opt, options)
    }

    /**
     * Initializes and updates the elements in the head
     * @param  {Boolean} update
     */
    function init (update) {
      var self = this
      var head = (typeof self.$options.head === 'function') ? self.$options.head.bind(self)() : self.$options.head
      if (!head) return
      Object.keys(head).forEach(function (key) {
        var prop = head[key]
        if (!prop) return
        var obj = (typeof prop === 'function') ? head[key].bind(self)() : head[key]
        if (key === 'title') {
          util[key](obj)
          return
        }
        util.handle(obj, key, 'head', update)
      })
      self.$emit('okHead')
    }

    /**
     * Remove the meta tags elements in the head
     */
    function destroy () {
      if (!this.$options.head) return
      util.undoTitle(diffTitle)
      util.undo()
    }

    // v1
    if (Vue.version.match(/[1].(.)+/g)) {
      Vue.mixin({
        ready: function () {
          init.call(this)
        },
        destroyed: function () {
          destroy.call(this)
        },
        events: {
          updateHead: function () {
            init.call(this, true)
            util.update()
          }
        }
      })
    }
    // v2
    if (Vue.version.match(/[2].(.)+/g)) {
      Vue.mixin({
        created: function () {
          var self = this
          self.$on('updateHead', function () {
            init.call(this, true)
            util.update()
          })
        },
        mounted: function () {
          init.call(this)
        },
        beforeDestroy: function () {
          destroy.call(this)
        }
      })
    }
  }