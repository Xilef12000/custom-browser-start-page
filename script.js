function onload() {
	document.getElementById("search_bar").focus();
	const txt = getComputedStyle(json).getPropertyValue('--json');
	const obj = JSON.parse(txt);
	generateTable(obj);
	logo(obj.settings.logo);
	update(obj.settings.ignoreUpdates);
}
function search(event) {
	var key = event.key;
	if (key == "Enter"){
		var search_input = document.getElementById('search_bar').value;
		var search_url = "https://www.google.com/search?q=" + search_input;
		window.open(search_url, "_self");
	}
}
function logo(logo) {
	if (logo == false){
		document.getElementById("logo").style.visibility = "hidden";
	}
}
function httpGet(theUrl)
{
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function update(ignoreUpdates) {
	if (!ignoreUpdates == true){
		const api = httpGet("https://www.xilef12000.com/API/versions.json");
		const apiJson = JSON.parse(api);
		//console.log(apiJson.Xilef12000["custom-browser-start-page"].version);
		if (apiJson.Xilef12000["custom-browser-start-page"].version != version) {
			var message = ""
			message += "Update available: you are still using version "
			message += version
			message += " but there is a newer version "
			message += apiJson.Xilef12000["custom-browser-start-page"].version
			message += ": \n \n"
			message += apiJson.Xilef12000["custom-browser-start-page"].message
			alert(message);
		}
	}
}
function generateTable(obj) {
	const rows = obj.data.rows;
	const columns = obj.data.columns;
	var table_content = '<center><table>';
	for (var i = 0; i <= rows - 1; i++) {
		table_content += '<tr>';
		for (var j = 0; j <= columns - 1; j++) {
			table_content += '<td>';
			table_content += '<a class="a" href="' + obj.content[i][j].url + '"><center><div class="div">';
			if (obj.content[i][j].image !== "") {
				if (obj.content[i][j].image.slice(0, 5) == "TEXT:") {
					table_content += '<div class="img_text">'
					table_content += obj.content[i][j].image.slice(5, obj.content[i][j].image.lenght);
					table_content += '</div>'
				} 
				else {
					table_content += '<img class="img" src="'
					table_content += obj.content[i][j].image;
					table_content += '">'
				}
			}
			else{
				table_content += '<img class="img" src="'
				table_content += obj.content[i][j].url + "favicon.ico";
				table_content += '">'
			}
			table_content += '</div><p class="p">' + obj.content[i][j].name + '</p></center></a>';
			table_content += '</td>';
		}
		table_content += '</tr>';
	}
	table_content += '<table></center>';
	document.getElementById("table_div").innerHTML = table_content;
}