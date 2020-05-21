function getDate(str){
    const dateDict = {"января": 1, "февраля": 2, "марта": 3, "апреля": 4, "мая": 5,
        "июня": 6, "июля": 7, "августа":8, "сентября": 9, "октября": 10, "ноября": 11, "декабря": 12};
    str = str.split(" ");
    if (str[1] === "ч."){
        let hours = new Date().getHours()-str[0];
        let date = new Date().getDate();
        if(hours<0){
            date -= 1;
            hours = 24+hours;
        }
        const dateFormat = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${date}-${hours}:00`;
        return new Date(dateFormat);
    }
    else if (str[0] === "Вчера"){
        const dateFormat = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}-${str[2]}`;
        return new Date(dateFormat);
    }
    else if (str[1] === "мин.") {
        let minutes = new Date().getMinutes()-str[0];
        let hours = new Date().getHours();
        if(minutes<0){
            hours -= 1;
            minutes = 60+minutes;
        }
        const dateFormat = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${hours}:${minutes}`;
        return new Date(dateFormat);
    }
    else if (str[0] === "Только") {
        const dateFormat = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`;
        return new Date(dateFormat);
    }
    else {
        const dateFormat = `${new Date().getFullYear()}-${dateDict[str[1]]}-${str[0]}-${str[3]}`;
        return new Date(dateFormat);
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const title = document.querySelector('._6j_c').innerHTML;
        let postArray = Array.from(document.querySelectorAll("article"));
        postArray=postArray.filter((elem)=>{
            return elem.classList.contains("async_like")
        });
        let resArray = [];
        postArray.forEach((elem)=>{
            const link = elem.querySelector('._5msj').getAttribute("href");
            const date = getDate(elem.querySelector('abbr').innerText);
            resArray.push([link, date, elem.querySelector('abbr').innerText, title]);
        });
        chrome.runtime.sendMessage({"posts": resArray, "close": true});
    }
};