function properties(obj, list) {
        var moreInfo = document.createElement("table");
        for (var i = 0; i < list.length; i++) {
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.textContent = list[i];
          tr.appendChild(td1);
          var td2 = document.createElement("td");
          td2.textContent = obj[list[i]].toString();
          tr.appendChild(td2);
          moreInfo.appendChild(tr);
        }
        return moreInfo;
      }