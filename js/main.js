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
          mangaAPI = data;
          //console.log(data['manga'][0]["t"]);
          for (var i = 0; i < data['manga'].length; i++) {
               allMangaTitle.push(data['manga'][i]["t"]);
           }

           // Generate the manga selection for front page
           generateFrontPageManga(data);
        }
    });

    $("#mangaSearchFieldBox").autocomplete({
        source: allMangaTitle
    });

    $("#mangaSearchFieldBox").keyup(function(event) {
        if (event.keyCode === 13) {
            $('#exampleModal').modal('show');
            clearAllPreviousSearchResult();
            searchResult();
            // LINA PUT THE FUNCTION THAT GENERATES THE SEARCH RESULTS BELOW HERE!!!
        }
    });

});

function searchResult(){
  var searchStringFromTopBar = document.getElementById("mangaSearchFieldBox").value;
  if (searchStringFromTopBar != ""){
    var title = document.getElementById("exampleModalLabel");
    title.innerHTML = "<center>Search result for " + searchStringFromTopBar + "</center>";

  }
}

function clearAllPreviousSearchResult(){
  $("#allSearchResultDiv").html("");
}

function generateFrontPageManga(data){
  lengthOfAPI = data['manga'].length;
  //4e70ea10c092255ef7004aa2, 4e70ea03c092255ef70046f0, 4e70ea10c092255ef7004a8c, 5224e32c45b9effc5b1efec9, 4e70ea01c092255ef7004674, 4e70ea03c092255ef7004734
  for (var i = 0; i < lengthOfAPI; i++) {
    if (['4e70ea10c092255ef7004aa2', '4e70ea03c092255ef70046f0', '4e70ea10c092255ef7004a8c', '5224e32c45b9effc5b1efec9', '4e70ea01c092255ef7004674', '4e70ea03c092255ef7004734'].indexOf(data['manga'][i]["i"]) >= 0) {
      createMangaForTopPick(data['manga'][i]);
    }
  }

  counter = 0;
  while (counter < 6){
    createMangaForRandomPick(data['manga'][Math.floor(Math.random() * lengthOfAPI) + 0]);
    counter++;
  }
}

function createMangaForTopPick(mangaDetail){
    var element = document.getElementById('mainContent');
    element.insertAdjacentHTML('afterbegin', "<div class='col-md-4'> <div class='card mb-4 box-shadow'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "'><center><img class='card-img-top' src='https://cdn.mangaeden.com/mangasimg/" + mangaDetail['im'] + "' alt='Card image cap'></center></a><div class='card-body'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "' class='card-text'><center> " + mangaDetail['t'] + " </center></a></div></div></div>");
}

function createMangaForRandomPick(mangaDetail){
  var element = document.getElementById('randomContent');
  if (mangaDetail['im'] == null){
    element.insertAdjacentHTML('afterbegin', "<div class='col-md-4'> <div class='card mb-4 box-shadow'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "'><center><img class='card-img-top' src='img/notFound.png' alt='Card image cap'></center></a><div class='card-body'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "' class='card-text'><center> " + mangaDetail['t'] + " </center></a></div></div></div>");

  } else {
    element.insertAdjacentHTML('afterbegin', "<div class='col-md-4'> <div class='card mb-4 box-shadow'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "'><center><img class='card-img-top' src='https://cdn.mangaeden.com/mangasimg/" + mangaDetail['im'] + "' alt='Card image cap'></center></a><div class='card-body'><a href='pages/manga.html?mangaID=" + mangaDetail['i'] + "' class='card-text'><center> " + mangaDetail['t'] + " </center></a></div></div></div>");
  }
}
