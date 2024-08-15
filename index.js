let paragraphs = [...document.querySelectorAll('p')]
// console.log(paragraphs)
let spans = []

paragraphs.forEach(paragraph => {
    let htmlString = ''
    let pArray = paragraph.textContent.split('') // 문장을 한글자씩 자름
    for(let i = 0; i < pArray.length; i++){
        htmlString += `<span>${pArray[i]}</span>`
    } // 각 글자를 span 태그로 감싼다
    paragraph.innerHTML = htmlString
})

spans = [...document.querySelectorAll('span')]


// 해당코드는 opacityValue 를 0.1과 1로 제한한다. 
// top 이 작아질수록 opacityValue 는 커지며 1에 가까워진다. 또한, left 가 작아질수록 opacityValue 는 커지며 1에 가까워진다.
// 즉, 글자가 기준에 가까울수록 opacityValue 값은 커지며, 글자가 브라우저 좌측 모서리에 근접할수록 opacityValue 값은 커진다.
// let opacityValue = 1 - ((top * .01) + (left * .001)) < 0.1 ? 0.1 : 1 - ((top * .01) + (left * .001)).toFixed(3)
// opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3)

// top = top - (window.innerHeight * .4) => 글자밝기가 변하는 기준선
// 특정 글자가 브라우저 높이의 40% 기준에 가까워질수록 top 은 양수이지만 점점 0에 가까워지므로 opacityValue 값은 점점 커지고 글자는 점점 밝아진다.
// 특정 글자가 브라우저 높이의 40% 기준보다 올라가면 갈수록 top 이 기준(window.innerHeight * .4)보다 작아지므로 top 값은 음수이고 점점 커진다. 
// 그러므로 글자가 기준을 넘어가서 더 올라갈수록 1에서 음수값을 빼면 1보다 커지므로 결국 1에 가까워져서 밝기 변화가 거의 없다.
// 결국 해당 문장이 브라우저 높이의 40%에 근접할수록 1에 가까워진다.

// 정리하면 글자가 기준선에 근접할수록 밝아지고, 브라우저 좌측 모서리에서 멀어질수록 어둡다.

function revealSpans(){
    for(let i = 0; i < spans.length; i++){
        // 해당 SPAN 태그를 포함하고 있는 P 태그의 상단이 브라우저 수평중앙선을 넘어 위로 올라가면
        if(spans[i].parentElement.getBoundingClientRect().top < window.innerHeight / 2){
            let {left, top} = spans[i].getBoundingClientRect()
            top = top - (window.innerHeight * .4) // 특정 글자가 브라우저 높이의 40% 기준으로 위에 있는지 아래에 있는지 판단함 (글자가 기준보다 아래에 있으면 top은 기준보다 크므로 양수이고, 기준보다 위에 있으면 기준보다 작으므로 음수이다.)
            let opacityValue = 1 - ((top * .01) + (left * .001)) < 0.1 ? 0.1 : 1 - ((top * .01) + (left * .001)).toFixed(3)
            opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3)
            spans[i].style.opacity = opacityValue

        }
    }
}

window.addEventListener('scroll', () => {
    revealSpans()
})
revealSpans()
