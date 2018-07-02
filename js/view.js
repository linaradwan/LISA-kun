var url = new URL(window.location.href);
var chapterID = url.searchParams.get("ID");
var pageID = url.searchParams.get("pageID");


$("#selectPagesList").change(function() {
  var id = $(this).children(":selected").attr("id");
  window.location.replace("view.html?" + id);
});



generateChapter(chapterID, pageID);

function generateChapter(id){
  getJSONFromURL("https://www.mangaeden.com/api/chapter/", id, pageID);
}

function getJSONFromURL(url, id, pageID){
  $.ajax({
    dataType: "json",
    url: url + id + "/",
    success: function(data) {
         parseData(data, pageID, id);
      }
  });
}

function updateDropDownList(json, chapterID){
  var dropdownOption = document.getElementById("selectPagesList");
  // Loop elements backward due to chapters being in desc order
  for (i = json["images"].length-1; i >=0 ; i--){
    var option = document.createElement("option");
    if (i == json["images"].length-1){
      var url = new URL(window.location.href);
      var pageID = url.searchParams.get("pageID");
      option.innerHTML = "Selected Page: " + pageID;
      dropdownOption.appendChild(option);

    } else {
      option.setAttribute("id", 'ID=' + chapterID + '&pageID=' + json["images"][i][0]);
      option.innerHTML = json["images"][i][0];
      dropdownOption.appendChild(option);
    }
  }
}

function displayImage(json, pageID){
  var img = document.getElementById("contentImage");
  img.setAttribute("src", "https://cdn.mangaeden.com/mangasimg/" + json["images"][pageID][1]);
}

function parseData(json, pageID, chapterID){
  console.log(json);
  // Update the dropdown list
  updateDropDownList(json, chapterID);

  // Display current page image
  displayImage(json, pageID);

}
