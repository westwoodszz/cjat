document.addEventListener('DOMContentLoaded', () => {
    // Частицы фона
    function createParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['🌸', '💮', '🌺', '🌷'][Math.floor(Math.random()*4)];
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite`;
        document.getElementById('particles').appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }

    // Клик по кнопкам
    document.body.addEventListener('click', (e) => {
        if(e.target.closest('.neumorphic-btn')) {
            createHearts(e);
        }
    });

    // Генератор сердечек
    function createHearts(e) {
        for(let i = 0; i < 7; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.animation = `heartFloat ${1 + i/2}s ease-out`;
            document.getElementById('heartsContainer').appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    }

    // Секретные сообщения
    document.querySelectorAll('[data-action="secret"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const secrets = [
                "помню как увидел звезды в твоих глазах, больше не завидую гагарину",
                "люблю тебя очень!!!",
                "ты превращаешь обычные моменты в магию",
                "❤️❤️❤️"
            ];
            document.getElementById('secretText').textContent = secrets[Math.floor(Math.random()*secrets.length)];
            document.getElementById('secretModal').style.display = 'block';
        });
    });

    // Закрытие модалок
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('secretModal').style.display = 'none';
    });

    // Галерея фото
    document.querySelector('[data-action="memories"]').addEventListener('click', () => {
        document.querySelectorAll('.photo-card').forEach(card => {
            card.classList.add('active');
        });
    });

    document.querySelectorAll('.close-photo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.photo-card').classList.remove('active');
        });
    });

    // Мини-игра
    let score = 0;
    let gameInterval;
    let gameContainer;
    let animationStyle;

    document.querySelector('[data-action="surprise"]').addEventListener('click', () => {
        score = 0;
        if(gameContainer) gameContainer.remove();
        if(animationStyle) animationStyle.remove();
        
        animationStyle = document.createElement('style');
        animationStyle.textContent = `@keyframes fall { from { top: -50px; } to { top: 100%; } }`;
        document.head.appendChild(animationStyle);

        gameContainer = document.createElement('div');
        gameContainer.className = 'game-modal';
        gameContainer.innerHTML = `
            <div class="game-content">
                <h2>поймай сердечки! 💘</h2>
                <div class="score">Собрано: ${score}</div>
                <div class="hearts-field"></div>
                <button class="game-close">&times;</button>
            </div>
        `;

        gameContainer.querySelector('.game-close').addEventListener('click', () => {
            gameContainer.remove();
            clearInterval(gameInterval);
            animationStyle.remove();
        });

        const heartsField = gameContainer.querySelector('.hearts-field');
        const messages = ['умничка! 😍', 'так держать! 💪', 'ты лучшая🏆', 'горжусь тобой!!💖'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 90 + '%';
            
            heart.addEventListener('click', () => {
                if(!heart.classList.contains('caught')) {
                    score++;
                    heart.classList.add('caught');
                    heart.style.animation = 'none';
                    heart.style.transform = 'scale(1.5) rotate(360deg)';
                    gameContainer.querySelector('.score').textContent = `Собрано: ${score}`;
                    
                    if(score >= 30) {
                        const winModal = document.createElement('div');
                        winModal.className = 'win-modal';
                        winModal.innerHTML = `
                            <div class="win-content">
                                <h2>Софа, ты умница! 🎉</h2>
                                <p>Ты собрала все 30 сердечек!</p>
                                <button class="win-close">Закрыть</button>
                            </div>
                        `;
                        
                        winModal.querySelector('.win-close').addEventListener('click', () => {
                            winModal.remove();
                            gameContainer.remove();
                            clearInterval(gameInterval);
                            animationStyle.remove();
                        });
                        
                        document.body.appendChild(winModal);
                        clearInterval(gameInterval);
                    } else if(score % 10 === 0) {
                        const toast = document.createElement('div');
                        toast.className = 'game-toast';
                        toast.textContent = messages[Math.floor(Math.random()*messages.length)];
                        heartsField.appendChild(toast);
                        setTimeout(() => toast.remove(), 2000);
                    }
                }
                setTimeout(() => heart.remove(), 300);
            });

            heartsField.appendChild(heart);
        }

        gameInterval = setInterval(createHeart, 800);
        document.body.appendChild(gameContainer);
    });

    // Печатная машинка
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1), 50);
        }
    }

    typeWriter(document.getElementById('mainMessage'), 
        "Привет, моя любимая!!! я потратил много сил, и хочу сказать, как же я тебя все таки люблю!💕");

    // Фоновая анимация
    setInterval(createParticle, 800);
});