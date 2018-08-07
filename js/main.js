var allMangaTitle = ["lina"];

function showTop(str) {
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(" ").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","getTop.php?q="+str,true);
        xmlhttp.send();
    }


$( document ).ready(function() {
  // Get the json response of all the manga titles.
    $.ajax({
      dataType: "json",
      url: "https://www.mangaeden.com/api/list/0/",
      success: function(data) {
          //console.log(data['manga'][0]["t"]);
          for (var i = 0; i < data['manga'].length; i++) {
               allMangaTitle.push(data['manga'][i]["t"]);
           }
        }
    });

    $("#mangaSearchFieldBox").autocomplete({
        source: allMangaTitle
    });

});
