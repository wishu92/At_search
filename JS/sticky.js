// HTML 본문이 로드된 후 이벤트가 실행되도록 설정
document.addEventListener("DOMContentLoaded", () => {
    const bookItems = document.querySelectorAll('.best-selling-img-group li');

    function handleScroll() {
        bookItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                item.classList.add('scroll-transition');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
});


document.addEventListener("DOMContentLoaded", () => {
    const imgGroup = document.querySelector('.best-selling-img-group');

    window.addEventListener('scroll', () => {
        // 스크롤에 따른 이동 거리 계산
        const scrollY = window.scrollY;

        // translateY를 스크롤 값에 따라 조절하여 그룹을 위로 올립니다
        imgGroup.style.transform = `translateY(-${scrollY * 0.2}px)`;
    });
    
});


document.addEventListener("DOMContentLoaded", () => {
    const imgGroup = document.querySelector('.best-selling-img-group');
    let lastScrollY = 0;
    let currentTranslateY = 0;
    const damping = 0.1;  // 이동이 천천히 따라가도록 조절하는 감쇠 비율

    function smoothScroll() {
        // 스크롤한 거리의 일부를 목표 위치로 설정
        const targetTranslateY = -lastScrollY * 0.2;

        // 현재 이동 위치가 목표 위치를 따라가도록 계산
        currentTranslateY += (targetTranslateY - currentTranslateY) * damping;

        // 변환 적용
        imgGroup.style.transform = `translateY(${currentTranslateY}px)`;

        // 애니메이션 반복
        requestAnimationFrame(smoothScroll);
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
    });

    // 애니메이션 루프 시작
    smoothScroll();
});
