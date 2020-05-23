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
        setTimeout(()=>{
            let groupTitle = document.querySelector('.oi732d6d.ik7dh3pa.d2edcug0.qv66sw1b.c1et5uql.a8c37x1j.s89635nw.ew0dbk1b.a5q79mjw.g1cxx5fr.ekzkrbhg.oo9gr5id.hzawbc8m.ni8dbmo4.stjgntxs.ltmttdrg.g0qnabr5');
            if(groupTitle){
                groupTitle= groupTitle.innerHTML;
            }
            let postArray = Array.from(document.querySelectorAll(".sjgh65i0.l9j0dhe7.k4urcfbm.du4w35lb"));
            let resArray = [];
            postArray.forEach((elem)=>{
                const title = elem.querySelector('.gmql0nx0.l94mrbxd.p1ri9a11.lzcic4wl.aahdfvyu.hzawbc8m').innerText;
                const origDate = elem.querySelector('.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw').innerText;
                const date = getDate(origDate);
                let text = elem.querySelector('.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q');
                if (text !== null){
                    text = text.innerText;
                }
                let image = elem.querySelector('.i09qtzwb.n7fi1qx3.datstx6m.pmk7jnqg.j9ispegn.kr520xx4.k4urcfbm.bixrwtb6');
                if (image !== null){
                    image = image.getAttribute('src');
                }
                let video = elem.querySelector('.k4urcfbm.datstx6m.a8c37x1j');
                if (video !== null){
                    video = video.getAttribute('src');
                }
                resArray.push([title, date, origDate, image, groupTitle, video, text]);
            });
            chrome.runtime.sendMessage({"posts": resArray, "close": true});
        }, 2000);
    }
};