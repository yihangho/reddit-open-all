// regex that matches reddit sites
var regex = new RegExp("^https?://(?:www\.)?reddit\.com", "i");

// show page action on all reddit sites
chrome.tabs.query({}, function(result) {
	for (var i = 0; i < result.length; i++) {
		var url = result[i].url;
		if (regex.test(url)) {
			chrome.pageAction.show(result[i].id);
		}
	}
});

// create a new windows, and open a tab for each link present in current reddit page
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {request: "get links"}, function(msg) {
		for (var i = 0; i < msg.links.length; i++) {
			msg.links[i] = "view.html?" + getQueryString(msg.links[i]);
		}

		chrome.windows.create({
			url: msg.links,
			focused: true
		});

		function getQueryString(obj) {
			var output = "";
			var value;
			for (key in obj) {
				value = encodeURIComponent(obj[key]);
				key = encodeURIComponent(key);
				output += key + "=" + value + "&";
			}
			console.log(output);
			return output.substr(0, output.length-1);
		}
	});
});

// show/hide page action when tab is updated
chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
	if (changeInfo.url) {
		if (regex.test(changeInfo.url)) {
			chrome.pageAction.show(id);
		} else {
			chrome.pageAction.hide(id);
		}
	}
});
