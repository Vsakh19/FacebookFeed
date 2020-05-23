chrome.runtime.onMessage.addListener(function(request,sender){
    if (request.close){
        chrome.tabs.remove(sender.tab.id);
    }
    if (request.message) {
        chrome.runtime.sendMessage({data: request.message});
    }
    /*if (request.posts) {
        console.log('message');
        chrome.runtime.sendMessage({posts: request.posts});
    }*/
});