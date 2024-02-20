function onTorrent (torrent) {
    torrent.files.forEach(function (file) {
      file.getBuffer(function (err, b) {
        if (err) return log(err.message)
        // debug(b)
        // debug(b.toString('utf8'))
        var got_page = JSON.parse(b.toString('utf8'))
        // self.emit('message', "Got cached version of "+got_page.url+" from web peer, checking security hash.")

        sha(got_page.page, function (page_hash) {
          if (page_hash != self.security_sha1[got_page.url]) {
            self.emit('message', 'Cached version of ' + got_page.url + ' received, has wrong security hash, rejecting it.');
            return;
          }

          self.emit('message', 'Cached version of ' + got_page.url + ' has a verified security hash! Proceeding by changing links in page.');
          cached_link_lists[got_page.url] = got_page
          self.update_links()

          window.onpopstate = function(to) {
            document.documentElement.innerHTML = to.state.page
            document.title = cached_mark+" "+to.state.title
            window.scrollTo(0, 0);
            self.emit('onpopstate', to)

            var this_page_links = document.getElementsByTagName('a')
            for(var i = 0; i < this_page_links.length ; i++){
              if(Object.keys(cached_link_lists).indexOf(this_page_links[i].href) > -1){
                this_page_links[i].onclick = function(event){
                  event.preventDefault();
                  document.documentElement.innerHTML = cached_link_lists[event.target.href].page
                  document.title = cached_mark+' '+cached_link_lists[event.target.href].title
                  window.history.pushState({page: cached_link_lists[event.target.href].page, title: cached_link_lists[event.target.href].title},"", event.target.href);
                  setTimeout(function(){
                    window.scrollTo(0, 0);
                  }, 10)
                }
              } else {
                self.fetch(this_page_links[i])
              }
            }
          }
        });
      })
    })
  }