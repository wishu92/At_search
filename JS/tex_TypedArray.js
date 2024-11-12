    // 각 h1 요소에 대해 사용할 텍스트 배열
    let typeTextElements = document.querySelectorAll(".type-text");
    let textToBeTypedArrList = [
        ["멋진", "아름다운", "무한한"],
        ["열정을", "꿈을", "앞날을"]
    ];
    let animations = [];
    let totalAnimationTime = 3000; // 애니메이션 총 시간 (작성 + 유지)

    // 각 요소마다 애니메이션 설정 및 실행
    typeTextElements.forEach((element, idx) => {
        animations.push({
            element: element,
            textArray: textToBeTypedArrList[idx], // 해당 요소에 맞는 텍스트 배열 할당
            textToBeTypedIndex: 0,
            index: 0,
            isAdding: true
        });
        playAnim(idx); // 애니메이션 실행
    });

    function playAnim(animationIndex) {
        let anim = animations[animationIndex];
        let currentText = anim.textArray[anim.textToBeTypedIndex];
        let textLength = currentText.length;

        // 작성에 할당된 시간 (전체 시간의 20%)
        let typingTime = totalAnimationTime * 0.2;

        // 유지 시간 (전체 시간의 80%)
        let sustainTime = totalAnimationTime * 0.8;

        // 작성 속도 계산
        let charInterval = typingTime / textLength;

        setTimeout(function () {
            anim.element.innerText = currentText.slice(0, anim.index);

            if (anim.isAdding) {
                // 작성 중
                if (anim.index >= textLength) {
                    anim.isAdding = false;

                    // 유지 시간을 설정
                    setTimeout(() => {
                        anim.isAdding = true; // 다음 텍스트를 작성할 준비
                        anim.textToBeTypedIndex = (anim.textToBeTypedIndex + 1) % anim.textArray.length;
                        anim.index = 0; // 인덱스 초기화
                        playAnim(animationIndex);
                    }, sustainTime);
                    return;
                } else {
                    anim.index++;
                }
            }

            playAnim(animationIndex);
        }, charInterval);
    }