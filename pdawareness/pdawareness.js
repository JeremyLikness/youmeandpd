(function () {    
    setTimeout(() => {
        const setup = {
            idx: 0,
            main: {},            
            queue: [],
            init: () => {
                for (let idx = 0; idx < setup.resources.length; idx++) {
                    setup.idx = idx;
                    const newImage = setup.genImage();
                    setup.main.appendChild(newImage);
                }
                setup.next();
            },
            genImage: () => {
                const div = document.createElement("div");
                div.classList.add("imgContainer");
                const img = document.createElement("img");
                const idxStr = setup.idx < 10 ? `0${setup.idx}` : 
                 `${setup.idx}`;
                const imgPath = `./Day ${idxStr}.png`;
                img.src = "./Day 00.png";                
                img.dataset.src = imgPath;
                const resource = setup.resources[setup.idx];
                img.alt = resource.text;
                img.title = resource.text;
                img.dataset.links = resource.links;
                img.onclick = () => {
                    window.open(imgPath,resource.text,'width=1080px,height=1350px,resizable=1');
                };
                setup.queue.push(img);
                div.appendChild(img);
                const wrapper = document.createElement("span");
                const id = setup.idx < 10 ? `wrapper0${setup.idx}` : `wrapper${setup.idx}`;
                wrapper.setAttribute("id", id);
                img.dataset.wrapper = id;
                wrapper.style.display = "none";
                const title = document.createElement("h3");
                title.innerText = resource.text; 
                wrapper.appendChild(title);          
                if (resource.links && resource.links.length) {
                    const p = document.createElement("p");
                    for (let idx = 0; idx < resource.links.length; idx++) {
                        const a = document.createElement("a");
                        a.href = resource.links[idx].url;
                        a.title = resource.links[idx].name;
                        a.target = "_blank";
                        a.innerText = resource.links[idx].name;
                        if (idx > 0) {
                            const span = document.createElement("span");
                            span.innerHTML= "&nbsp;|&nbsp;";
                            p.appendChild(span);
                        }
                        p.appendChild(a);
                    }
                    wrapper.appendChild(p);
                }       
                div.appendChild(wrapper);
                return div;
            },
            next() {
                if (setup.queue.length > 0) {
                    const next = setup.queue.shift();
                    next.src = next.dataset.src;
                    const wrapper = document.getElementById(next.dataset.wrapper);
                    wrapper.style.display = "inline";
                    setTimeout(setup.next, 500);
                }
            },
            resources: []
        };

        fetch("./pdawareness.json")
            .then(r => r.json()
                .then(data => setup.resources = data));

        setup.main = document.getElementById("mainContainer");
        setup.main.innerHTML = "";
        setup.init();
    });
})();