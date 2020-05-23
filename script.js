const refresh = document.querySelector(".datePicker__refreshFeed");
const feed = document.querySelector(".feed");
const input = document.querySelector(".datePicker__input");
const main = document.querySelector(".main");
const baseURL = "https://www.facebook.com/groups/";
let postsArray = [];
feed.innerHTML = '<h1>Я вывожусь всегда</h1>';


function updateFeed(arr){
    feed.innerHTML = "";
    arr.forEach((elem)=>{
        if(new Date(elem[1])>=new Date(input.value)) {
            const postContainer = document.createElement("div");
            const groupTitle = document.createElement("h2");
            const postTitle = document.createElement("h3");
            // postLink = document.createElement("a");
            const postDate = document.createElement("p");
            postContainer.classList.add('postContainer');
            groupTitle.classList.add('postContainer__title');
            /*postLink.classList.add('postContainer__link');
            postLink.setAttribute("href", `${baseURL + elem[0]}`);
            postLink.innerText = "Открыть пост";*/
            groupTitle.innerText = `${elem[4]}`;
            postDate.innerText = elem[2];
            postTitle.innerText = elem[0];
            /*postLink.addEventListener('click', ()=>{
                chrome.tabs.create({url: `${baseURL + elem[0]}`, active: false}, ()=> {});
            });*/
            postContainer.appendChild(groupTitle);
            postContainer.appendChild(postTitle);
            if (elem[6]){
                const postText = document.createElement("p");
                postText.innerText = elem[6];
                postContainer.appendChild(postText);
            }
            if (elem[3]){
                const postImg = document.createElement("img");
                postImg.classList.add('postContainer__img');
                postImg.setAttribute('src', elem[3]);
                postContainer.appendChild(postImg);
            }
            if (elem[5]){
                const postVid = document.createElement("video");
                postVid.setAttribute('src', elem[5]);
                postContainer.appendChild(postVid);
            }
            postContainer.appendChild(postDate);
            feed.appendChild(postContainer);
            main.style.display = 'block';
        }
    })
}

input.addEventListener('input', ()=>{
    refresh.removeAttribute('disabled');
});
refresh.addEventListener("click", (event)=>{
    event.preventDefault();
    postsArray = [];
    chrome.tabs.create({url: "https://m.facebook.com/groups_browse/your_groups/", active: false}, ()=> {});
});


chrome.runtime.onMessage.addListener((request,sender)=>{
    if (request.data){
        request.data.forEach((elem)=>{
            chrome.tabs.create({url: `${baseURL+elem+'?sorting_setting=RECENT_ACTIVITY'}`, active: false}, ()=> {});
        })
    }
    if (request.message){
        if(request.message.length === 0){
            const errorMessage = document.createElement('h2');
            errorMessage.innerText = "Не нашёл групп";
            main.appendChild(errorMessage);
        }
        else {
            const errorMessage = document.createElement('h2');
            errorMessage.innerText = `Нашел ${request.message.length} групп`;
            main.appendChild(errorMessage);
        }

    }
    if (request.debug) {
        request.posts.forEach((elem)=>{
            postsArray.push(elem);
        });
        postsArray.sort((a, b)=>{
            return new Date(b[1])-new Date(a[1])
        });
        const errorMessage = document.createElement('h1');
        if (request.defaultArray.length>0){
            errorMessage.innerText = "Код постов: " + request.defaultArray;
        }
        else {
            errorMessage.innerText = 'Не нашел посты, код страницы: ' + request.pageCode;
        }
        main.appendChild(errorMessage);
        updateFeed(postsArray);
    }
    if (request.error){
        const errorMessage = document.createElement('h2');
        errorMessage.innerText = request.error;
        main.appendChild(errorMessage);
    }
});