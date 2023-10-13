function onload() {
	document.getElementById("search_bar").focus();
}
function search(event) {
	var key = event.key;
	if (key == "Enter"){
		var search_input = document.getElementById('search_bar').value;
		var search_url = "https://www.google.com/search?q=" + search_input;
		window.open(search_url, "_self");
	}
}
