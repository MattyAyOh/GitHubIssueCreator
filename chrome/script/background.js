chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) 
	{
    if( request.method == "getTemplateLocation" )
    {
      sendResponse({location: localStorage['issueTemplate'], defaultChecked: localStorage['templateChecked'], savedTemplate: localStorage['savedTemplate']});
    }
    else if( request.method == "saveTemplateLocation" )
    {
    	localStorage['issueTemplate'] = request.location;
    }
    else
    {
      sendResponse({});
    }
	}
);

