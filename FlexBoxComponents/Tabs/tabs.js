
            const tabset = Array.from(document.querySelectorAll('.tabs'))
            const SELECTED = 'is-tab-selected';
            tabset.map((tabs)=>{
            tabs.addEventListener('click', (e)=>{
                e.stopPropagation();
                let node = e.target;
                Array.from(tabs.children).map((node)=>{
                node.classList.remove(SELECTED);
                })
                node.classList.add(SELECTED);
            })
            })