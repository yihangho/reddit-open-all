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
		chrome.windows.create({
			url: msg.links,
			focused: true
		});
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
