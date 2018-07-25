
[![LOGO IN PROGRESS](https://i.imgur.com/5sHN73G.png)](https://linaradwan.github.io/LISA-kun/index.html)


[![Coverage Status](https://img.shields.io/badge/Manga-19695%2B-green.svg)](#)

# LISA
Anime generator



## Features
- Created only with Javascript.
- DOM updated search queries & elements.
- Search Manga based on string
- Search Manga based on genre
- View Manga details (Images, descriptions, title etc)
- Read contents of Manga (Chapters)
- Mobile friendly
- <b>less than 300kb for the whole website!</b>
- MangaEden API.
- JQuery support
- Bootstrap framework

# How does it work?

### API

The scrap of Manga details are captured by the MangaEden API. The reason this site does not use any internal DB is we want to limit the process of hosting the site rather user can easily download this repository and run the index.html locally and start reading manga (assuming they have internet).

MangaEden API is captured via the following schema:


[![N|Solid](https://i.imgur.com/O8lmRAM.png)](#)

Where the request are done via AJAX call:

```javascript
function getJSONFromURL(url, id){
  $.ajax({
    dataType: "json",
    url: url + id + "/",
    success: function(data) {
         parseData(data);
      }
  });
}
```

The structure of the API url:

**Manga List**
URL: https://www.mangaeden.com/api/list/[language]/
Where [language] can be 0 (English) or 1 (Italian)
Returned data:

**Manga info**
URL: https://www.mangaeden.com/api/manga/[manga.id]/
Where [manga.id] is the manga's id you can get with the previous api call
Returned data: all the informations and chapters of the manga.

**Chapter info**
URL: https://www.mangaeden.com/api/chapter/[chapter.id]/
Where [chapter.id] is the chapter's id you can get with the previous api call.
Returned data: the images's urls and sizes of the chapter

### Wait a minute..

**How does JS get request method variable if JS does not support the use of capturing HTTP contracts?**
- If you look carefuly you will notice that the redirection between Manga.html -> View.html -> Manga.html ARE done via request methods. The URL itself contains http variable that JS use to make HTTP request. These variables are captured via JS session header response:

You will notice the capture of these variables on respected html js source code line 2,3;
```javascript
var url = new URL(window.location.href);
var mangaID = url.searchParams.get("mangaID");
```

# Construction of Manga detail page

Once a JSON call have been made to capture the manga detail from the manga ID captured via the request method, we followed the following methods to generate each responses;

```javascript
  changeCover(json["imageURL"]);
  changeTitle(json["title"]);
  changeArist(json["artist"]);
  changeChapter(json["chapters_len"])
  changeReleaseDate(json["created"]);
  changeStatusType(json["status"]);
  changePopularityRating(json["hits"]);
  changeDesc(json["description"]);
  changeListOfCat(json["categories"]);
  generateTable(json["chapters"])
  ```

  One unique change to JSON was the timing from function changeReleaseDate() was done via UNIX time. We made the convertion with the following design (User are more than welcome to change the structure of this function. The changes on the function will dynamically take effect to the html page as these are DOM generated):

 ```javascript
 function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate(); // adding useless var for references
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ', ' + year;
  return time;
}
 ```

 The creation of the long list which contains 4 columns vs finite amount x of rows was done dynamically via JS. We captured the size of all the chapterID and created the table height based on that. The "Read me" button was added with a ```location.href``` JS logic to redirect user to view.html page

 ```javascript
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
  ```

# Construction of View.html page

The creation of the page is pretty simple and same logic as manga.html. The only difference are the arrow keys which will contain the backward and forward of the page logic. The arrow key will appear on respected page (ie: on first page of the chapter, the left key won't appear as there are no previous pages), such logic was proclaimed via checking for null pointer on json->chapters->images->length. If ```length is <0 = null```

# Construction of the homepage

### How does the most popular manga works?
The website does not use any DB to store any Manga details, it runs on JS which is using the MangaEden API to gather all the detail. There are over 19,000 index (each manga) to get list of MangaID. We can use the ID to make another rest call to determine how much hits does each manga have.

**There are two ways we can overcome this issue. Both of them are dumb but I will suggest one of them.**
Since the website is written in JavaScript, we want to keep it that way. We do not want this site to be hosted externally such that it requires external server modification. No, we want this site to be fully localhost supported such that you can just run index.html and start reading manga (assuming you have Internet connection).

**So we will start using another API.**
We are calling it Lina'API. What is Lina'API? It will pretty much contain information that MangaEden.API does not contain. Lina'API will use information from MangaEden and generate other useful rest call that we can use to determine other neat stats.

**What is the final puzzle to Lina 'surprise'?**
I am surprised you managed to come this far (not really, you are a smart girl). I am something you use everyday, you lost me, you had me used by others and I am also in your kitchen. When you use me, you empty me fast. 

**How do we get "Most Popular Manga"?**
Lina'API will contain two GET request.

```getMostPopularManga``` -> accepts ```null``` -> returns JSON
```incrementManga``` -> accepts mangaID -> returns ```null```;

We can use Lina'API when DOM is being loaded on front page to give us the most popular manga read from Lisa.

***How do we determine what are the most popular manga read in Lisa?***
Everytime a user reads Manga on Lisa-Kun, Lisa will send a POST to incrementManga function, which will increment the MangaID the user currently has session onto. This will increase the popularity of that Manga such that next time user goes back to the front page, getMostPopularManga will return the new changes.
