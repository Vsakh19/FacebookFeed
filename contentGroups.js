document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
            window.scrollTo(0,document.body.scrollHeight);
            const groupList = document.querySelectorAll("._7ymc");
            let hrefList = [];
            groupList.forEach((elem)=>{
                const linkToGroup = elem.closest("a").getAttribute("href");
                hrefList.push(linkToGroup.split('/')[2]);
            });
            chrome.runtime.sendMessage({"message": hrefList, "close": true});
    }
};