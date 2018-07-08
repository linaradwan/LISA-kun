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

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ', ' + year;
  return time;
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

function changeCover(imageCover){
  var titleElement = document.getElementById("mangaImageCover");
  titleElement.setAttribute("src", imageCover);
  titleElement.setAttribute("width", "225px");
  titleElement.setAttribute("height", "300px");
}

function changeReleaseDate(Unixtime){
  var titleElement = document.getElementById("releaseDate");
  titleElement.innerHTML= "<b> Release Date: </b>" + timeConverter(Unixtime);
}

function changeStatusType(type){
  var titleElement = document.getElementById("airingStatus");
  var types = { 0:"Running", 1:"Stopped", 2:"Finished" };
  titleElement.innerHTML = "<b> Status: </b> " + types[type];
}

function changePopularityRating(hits){
  var titleElement = document.getElementById("popularityList");
  titleElement.innerHTML= "<b> Popularity: </b>" + hits + " users have read";
}

function changeDesc(desc){
  var titleElement = document.getElementById("desc");
  titleElement.innerHTML= "<b> description: </b>" + desc;
}

function changeListOfCat(catArray){
  var titleElement = document.getElementById("categoryList");
  for(count = 0; count < catArray.length; count++){
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.innerHTML = " " + catArray[count] + " ";
    titleElement.appendChild(a);
  }
}

function generateTable(chapterArray){
  var tbody = document.getElementById("chapterTable");
  for(row = 0; row < chapterArray.length; row++){
    var convertPublishDate = timeConverter(chapterArray[row][1]);
    var createPublishButton = '<button type="button" id="' + chapterArray[row][3] + '" class="btn btn-default" onClick="javascript:window.location.href=\'view.html?ID=' + chapterArray[row][3] + '&pageID=0\'">Read Now</button>';
    var columnsValue = { 1:chapterArray[row][2], 2:convertPublishDate, 3:createPublishButton };
    var tr = document.createElement("tr");
    for (column = 0; column < 4; column++){
      if (column == 0){
        var th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerHTML = chapterArray[row][0];
        tr.appendChild(th);
      } else {
        var td = document.createElement("td");
        td.innerHTML = columnsValue[column];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  }

  // Make the table sortable
  newTableObject = document.getElementById("chapterList");
  sorttable.makeSortable(newTableObject);
  var myTH = document.getElementsByTagName("th")[0];
  sorttable.innerSortFunction.apply(myTH, []);
}

function parseData(json){
  console.log(json);
  // Change image manga cover
  changeCover(json["imageURL"]);
  // Change title
  changeTitle(json["title"]);
  // Change artist
  changeArist(json["artist"]);
  // Change total chapter
  changeChapter(json["chapters_len"])
  changeReleaseDate(json["created"]);
  changeStatusType(json["status"]);
  changePopularityRating(json["hits"]);
  changeDesc(json["description"]);
  changeListOfCat(json["categories"]);
  generateTable(json["chapters"])
}
