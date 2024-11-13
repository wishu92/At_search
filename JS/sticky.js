document.addEventListener("DOMContentLoaded", () => {
    const imgGroup = document.querySelector('.best-selling-img-group');
    const bestPage = document.querySelector('.best-selling-page');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        // best-selling-page가 화면의 맨 위에 닿았는지 확인
        const bestPageTop = bestPage.getBoundingClientRect().top;
        const imgGroupBottom = imgGroup.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        // best-selling-page가 화면 맨 위에 닿았을 때부터 모션을 적용
        if (bestPageTop <= 0) {
            const scrollY = window.scrollY;
            imgGroup.style.transform = `translateY(-${(scrollY - bestPage.offsetTop) * 0.2}px)`;
        } else {
            // 페이지가 맨 위에 닿기 전까지는 원래 위치 유지
            imgGroup.style.transform = `translateY(0px)`;
        }

    });
});