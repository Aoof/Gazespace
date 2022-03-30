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