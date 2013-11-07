chrome.runtime.onMessage.addListener(function(msg, sender, callback) {
	var response = {};
	if (msg.request == "get links") {
		response.links = [];
		var num_anchors = $("div#siteTable a.title").length;
		$("div#siteTable a.title").each(function() {
			var link = $(this).attr("href");
			var title = $(this).text();
			var author = $(this).parent("p.title").siblings("p.tagline").children("a.author").text();

			// Links that point to another reddit page are often relative path
			if (link.substr(0, 4) != "http") {
				link = "http://www.reddit.com" + link;
			}

			response.links.push({ url: link, title: title, author: author });

			num_anchors--;
			if (!num_anchors) {
				callback(response);
			}
		});
	}
});
