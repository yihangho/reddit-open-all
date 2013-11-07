$(document).ready(function() {
	populateDOM();

	function parseQueryString() {
		var qs = window.location.search.substr(1).split('&');
		var output = {};
		for (var i = 0; i < qs.length; i++) {
			var tmp = qs[i].split('=');
			output[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
		}
		return output;
	}

	function populateDOM() {
		var parameters = parseQueryString();
		$("h1#title").text(parameters.title);
		$("iframe#target-page").attr("src", parameters.url);
		$("a#author").text(parameters.author);
		$("a#author").attr("href", "http://www.reddit.com/user/" + parameters.author);
	}
});
