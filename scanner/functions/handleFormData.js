function handleFormData (form) {
          for (var i = 0; i < $this._multipart.length; i++) {
            var item = $this._multipart[i]

            if (item.attachment && is(item.value).a(String)) {
              if (does(item.value).contain('http://') || does(item.value).contain('https://')) {
                item.value = Unirest.request(item.value)
              } else {
                item.value = fs.createReadStream(path.resolve(item.value))
              }
            }

            form.append(item.name, item.value, item.options)
          }

          return form
        }