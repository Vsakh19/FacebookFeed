const refresh = document.querySelector(".datePicker__refreshFeed");
const feed = document.querySelector(".feed");
const input = document.querySelector(".datePicker__input");
const main = document.querySelector(".main");
const baseURL = "https://m.facebook.com";
let postsArray = [];


function updateFeed(arr){
    feed.innerHTML = "";
    arr.forEach((elem)=>{
        if(new Date(elem[1])>=new Date(input.value)) {
            const postContainer = document.createElement("div");
            const postTitle = document.createElement("h2");
            const postLink = document.createElement("a");
            const postDate = document.createElement("p");
            postContainer.classList.add('postContainer');
            postTitle.classList.add('postContainer__title');
            postLink.classList.add('postContainer__link');
            postLink.setAttribute("href", `${baseURL + elem[0]}`);
            postLink.innerText = "Открыть пост";
            postTitle.innerText = `${elem[3]}`;
            postDate.innerText = elem[2];
            postLink.addEventListener('click', ()=>{
                chrome.tabs.create({url: `${baseURL + elem[0]}`, active: false}, ()=> {});
            });
            postContainer.appendChild(postTitle);
            postContainer.appendChild(postLink);
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
            chrome.tabs.create({url: `${baseURL+elem}`, active: false}, ()=> {});
        })
    }
    if (request.posts) {
        request.posts.forEach((elem)=>{
            postsArray.push(elem);
        });
        postsArray.sort((a, b)=>{
            return new Date(b[1])-new Date(a[1])
        });
        console.log(postsArray);
        updateFeed(postsArray);
    }
});