// GET manga request and generate the DOM
var url = new URL(window.location.href);
var mangaID = url.searchParams.get("mangaID");

generateMangaDetail(mangaID);



function generateMangaDetail(mangaID){
  getJSONFromURL("https://www.mangaeden.com/api/manga/", mangaID);
}


function getJSONFromURL(url, id){
  $.ajax({
    dataType: "json",
    url: url + id + "/",
    success: function(data) {
         parseData(data);
      }
  });
}

function changeTitle(title){
  var titleElement = document.getElementById("mangaTitles");
  titleElement.setAttribute("data-text", title);
  titleElement.innerHTML= title;
}

function changeArist(artist){
  var titleElement = document.getElementById("artistName");
  titleElement.innerHTML= "<b> Artist: </b> " + artist;
}

function changeChapter(chapterLength){
  var titleElement = document.getElementById("totalChapter");
  titleElement.innerHTML= "<b> Total Chapters: </b> " + chapterLength;
}

function parseData(json){
  console.log(json);

  // Change title
  changeTitle(json["title"]);

  // Change artist
  changeArist(json["artist"]);

  // Change total chapter
  changeChapter(json["chapters_len"])
}
