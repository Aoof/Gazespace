function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100
}

let bgAnimation = anime({
    targets: ".background",
    translateX: 10,
    autoplay: false,
    easing: "linear"
})

window.addEventListener('scroll', () => {
    const percentage = getScrollPercent();
    bgAnimation.seek(bgAnimation.duration * (percentage / 100))
})

// Selector logic
let selected    = document.querySelector(".nav-link.selected");

let topSelect   = document.createElement('img');
let botSelect   = document.createElement('img');

topSelect.className = "top";
botSelect.className = "bottom";

topSelect.src = "./media/Selector.svg";
botSelect.src = "./media/Selector.svg";

selected.appendChild(topSelect)
selected.appendChild(botSelect)

botSelect.style.top = (selected.clientHeight - 14) + "px";