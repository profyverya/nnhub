const container = document.querySelector('.shorties-container');
let currentIndex = 0;
const videoData = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.w3schools.com/html/movie.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
]; // Замените на ваш источник видео

// Функция для создания видео
function createVideo(src) {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'short-video';
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    videoWrapper.appendChild(video);
    return videoWrapper;
}

// Функция для загрузки видео
function loadVideos() {
    videoData.forEach((src) => {
        const videoElement = createVideo(src);
        container.appendChild(videoElement);
    });
}

// Установка свайпов
let startY = 0;
let isSwiping = false;

function handleTouchStart(event) {
    startY = event.touches[0].clientY;
    isSwiping = true;
}

function handleTouchMove(event) {
    if (!isSwiping) return;
    const diffY = event.touches[0].clientY - startY;

    // Прокрутка вверх/вниз
    if (Math.abs(diffY) > 50) {
        isSwiping = false;
        if (diffY > 0) {
            navigateVideos('prev');
        } else {
            navigateVideos('next');
        }
    }
}

function navigateVideos(direction) {
    const videos = document.querySelectorAll('.short-video');
    videos[currentIndex].style.transform = 'translateY(100%)';
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % videos.length;
    } else {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    }
    videos[currentIndex].style.transform = 'translateY(0)';
}

// Инициализация
loadVideos();
container.addEventListener('touchstart', handleTouchStart);
container.addEventListener('touchmove', handleTouchMove);

// Загружаем новые видео, если текущие закончились
document.addEventListener('transitionend', () => {
    if (currentIndex === videoData.length - 1) {
        loadVideos(); // Подгрузить больше видео (можно заменить на API запрос)
    }
});
