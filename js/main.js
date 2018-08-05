
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

var allMangaTitle = [
    "Naruto",
    "Naruto Shippuden",
    "Naruto: Movie 1",
    "Naruto: The ninja return",
    "Who is Naruto?"];
$("#mangaSearchFieldBox").autocomplete({
    source: allMangaTitle
});
