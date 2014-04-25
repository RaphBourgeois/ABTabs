chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
	var title = tab.title.match(/["](.*)["]/);
	if(!title){
		var asObjectId = tab.url.match(/&bo=(\w+)/);
		asObjectId = asObjectId?asObjectId:tab.url.match(/&box=(\w+)/);
		if(asObjectId){
			title = "id:"+asObjectId[1];
		}
	}else{
		title = title[1]
	}

	for(element in abtabs.oBuilderTypes){
		var BuilderType = abtabs.oBuilderTypes[element];
		var patternAdd = BuilderType.patternAdd?BuilderType.patternAdd:"AB -Creation of a new " + BuilderType.patternRoot,
			patternEdit = BuilderType.patternEdit?BuilderType.patternEdit:"AB -Modification of " + BuilderType.patternRoot,
			patternList = BuilderType.patternList?BuilderType.patternList:"AB -List of " + BuilderType.patternRoot;
		if(tab.title.search(patternAdd) != -1){
			changeDisplay("New " + BuilderType.root, BuilderType.root + "_icon.png");
			break;
		}else if(tab.title.search(patternEdit) != -1){
			if(title == null){
				changeDisplay(BuilderType.root, BuilderType.root + "_icon.png");
			}else{
				changeDisplay(title + " - " + BuilderType.root, BuilderType.root + "_icon.png");
			}
			break;
		}else if(tab.title.search(patternList) != -1){
			changeDisplay("List of " + (BuilderType.plural?BuilderType.plural:BuilderType.root + "s"), BuilderType.root + "_icon.png");
			break;
		}
	}

	function changeDisplay(title, iconName)	{
		chrome.tabs.executeScript(tab.id, {code:"document.title='" +  title + "'"});
		chrome.tabs.executeScript(tab.id, {code:"document.getElementsByTagName('link')[0].setAttribute('href','" + chrome.runtime.getURL('images/'+ iconName) + "')"});
		chrome.tabs.executeScript(tab.id, {code:"document.getElementsByTagName('link')[0].setAttribute('type','image/png')"});
	}
});