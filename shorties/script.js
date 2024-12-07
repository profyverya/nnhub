const videos = document.querySelectorAll('.short-video video');

// Автоматическое воспроизведение видео, которое в центре экрана
function handleScroll() {
    videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play();
        } else {
            video.pause();
        }
    });
}

document.querySelector('.shorties').addEventListener('scroll', handleScroll);

// Установка начального состояния
handleScroll();
