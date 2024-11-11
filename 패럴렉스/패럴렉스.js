function makeHorizonScroll(target,brakePoint) {

    target.classList.add('horizon-scroll-target');

    const scrollbarHeight = window.innerHeight - document.body.clientHeight

    const horizonContainer = document.createElement('div');
    horizonContainer.classList.add('horizon-scroll-container')

    target.parentElement.insertBefore(horizonContainer,target)
    // div들 생성하기만 하는게 아니라 적합한 html에 끼워넣어야함. 
    // 따라서 상위div만들어서 미리끼워넣기 target의 부모요소로 끼워넣기.
    // horizonContainer를 삽입, target전에(미리 만들어놓은 박스)
   

    const horizonSticky = document.createElement('div');
    horizonSticky.classList.add("horizon-scroll-sticky-view");

    const moveContainer = document.createElement('div');
    moveContainer.classList.add('horizon-scroll-move-container');

    horizonContainer.appendChild(horizonSticky);
    horizonSticky.appendChild(moveContainer);
    moveContainer.appendChild(target);
   




    const applyPos = (pos) => {
        moveContainer.style.transform = `translateY(${pos}px)`
    }

    const moveHorizonScroll =()=>{

        const pos = horizonContainer.getBoundingClientRect();
        const range = (moveContainer.clientHeight - window.innerHeight)*-1;
        let targetPos;

        if(pos.top > 0){
            targetPos = 0;
        }else if(pos.top < range) {
            targetPos = range;
        }else {
            targetPos = pos.top;
        }


        if(window.innerHeight < brakePoint){
            applyPos(0)
        }else {
            applyPos(targetPos)
        }
    }

    const checkBreaking = () => {
        return window.innerHeight < brakePoint ? true : false
    }

    const setCSS = () => {
        const resp = checkBreaking();
        if(resp){
            horizonContainer.style.Width = 'auto'
            horizonSticky.style.Width = 'auto'
            horizonSticky.style.position = 'relative'
            moveContainer.style.Height = `100%`;
        }else {
            moveContainer.style.Height = `${moveContainer.getBoundingClientRect().Height - window.innerHeight}px`
            horizonContainer.style.Width = `fit-content`
            // 컨텐츠의 넓이에 따라 높이가 만들어져야 하므로 css순서중요
            horizonSticky.style.Height = `100vh`
            horizonSticky.style.position = 'sticky'
        }
    }

    const init = () => {
        horizonSticky.style.Height = `100vh`
        horizonSticky.style.overflow = `hidden`
        horizonSticky.style.top = `0px`

        moveContainer.style.Width = '100%'
        moveHorizonScroll()
        setCSS();
    }


    init();
    window.addEventListener('scroll',moveHorizonScroll)
    window.addEventListener('resize',()=>{
        moveHorizonScroll()
        setCSS();
    })

}