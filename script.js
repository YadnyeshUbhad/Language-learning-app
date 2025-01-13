// JavaScript functionality for the web application

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to sections
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back-to-top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Feature section interactivity
    const featureButtons = document.querySelectorAll('.feature button');

    featureButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Feature coming soon! Stay tuned.');
        });
    });

    // Language selection dropdown (demo functionality)
    const languageSelector = document.querySelector('.language-selector select');

    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            alert(`You have selected: ${e.target.value}`);
        });
    }

    // Dynamic Welcome Message Based on Time of Day
    const greetingElement = document.querySelector('.overlay h1');

    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) {
            greeting = 'Good Morning!';
        } else if (hour < 18) {
            greeting = 'Good Afternoon!';
        } else {
            greeting = 'Good Evening!';
        }

        greetingElement.textContent = greeting;
    }

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.padding = '10px 20px';
    darkModeToggle.style.backgroundColor = '#ffcc00';
    darkModeToggle.style.color = '#000';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '5px';
    darkModeToggle.style.cursor = 'pointer';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = 'Switch to Light Mode';
        } else {
            darkModeToggle.textContent = 'Switch to Dark Mode';
        }
    });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5
    });

    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        observer.observe(section);
    });

    // Flashcards Interactivity
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Quiz Functionality
    const quizForm = document.querySelector('.quiz-form');
    const quizResult = document.querySelector('.quiz-result');

    if (quizForm && quizResult) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let score = 0;
            const answers = quizForm.querySelectorAll('input[type="radio"]:checked');

            answers.forEach(answer => {
                if (answer.dataset.correct === 'true') {
                    score++;
                }
            });

            quizResult.textContent = `Your Score: ${score}/${answers.length}`;
        });
    }

    // Pronunciation Guide
    const pronunciationButtons = document.querySelectorAll('.pronunciation-btn');

    pronunciationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.dataset.text;
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        });
    });

    // Progress Tracking
    const progressKey = 'language-learning-progress';
    let progress = JSON.parse(localStorage.getItem(progressKey)) || {};

    const updateProgress = () => {
        localStorage.setItem(progressKey, JSON.stringify(progress));
    };

    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        progressBar.style.width = `${progress.completed || 0}%`;
    }

    // Example of tracking progress
    const completeLessonBtn = document.querySelector('.complete-lesson-btn');

    if (completeLessonBtn) {
        completeLessonBtn.addEventListener('click', () => {
            progress.completed = (progress.completed || 0) + 10;
            if (progress.completed > 100) progress.completed = 100;
            updateProgress();

            if (progressBar) {
                progressBar.style.width = `${progress.completed}%`;
            }
        });
    }

    // Leaderboard System
    const leaderboardKey = 'language-learning-leaderboard';
    let leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];

    const updateLeaderboard = (username, score) => {
        leaderboard.push({ username, score });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10); // Top 10
        localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
    };

    const displayLeaderboard = () => {
        const leaderboardElement = document.querySelector('.leaderboard');

        if (leaderboardElement) {
            leaderboardElement.innerHTML = '<h3>Leaderboard</h3>';
            leaderboard.forEach((entry, index) => {
                leaderboardElement.innerHTML += `<p>${index + 1}. ${entry.username} - ${entry.score}</p>`;
            });
        }
    };

    // Simulated quiz submission for leaderboard
    const quizSubmitBtn = document.querySelector('.submit-quiz-btn');
    const usernameInput = document.querySelector('.username-input');

    if (quizSubmitBtn && usernameInput) {
        quizSubmitBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const score = Math.floor(Math.random() * 100); // Randomized score for demo

            if (username) {
                updateLeaderboard(username, score);
                displayLeaderboard();
            } else {
                alert('Please enter a username.');
            }
        });
    }

    displayLeaderboard();

    // Daily Challenges
    const challengeDescriptions = [
        "Complete 5 flashcards",
        "Score at least 80% on a quiz",
        "Learn the pronunciation of 3 words",
        "Review 10 flashcards",
        "Take a new quiz"
    ];

    const dailyChallengeKey = "daily-challenge";
    let dailyChallenge = JSON.parse(localStorage.getItem(dailyChallengeKey)) || {};
    const challengeDescriptionElement = document.querySelector(".challenge-description");
    const timerElement = document.getElementById("timer");
    const completeChallengeBtn = document.querySelector(".complete-challenge-btn");

    // Generate or load daily challenge
    const setDailyChallenge = () => {
        const now = new Date();
        if (!dailyChallenge.date || new Date(dailyChallenge.date).toDateString() !== now.toDateString()) {
            dailyChallenge = {
                description: challengeDescriptions[Math.floor(Math.random() * challengeDescriptions.length)],
                date: now.toISOString(),
                completed: false
            };
            localStorage.setItem(dailyChallengeKey, JSON.stringify(dailyChallenge));
        }
        challengeDescriptionElement.textContent = dailyChallenge.description;
    };

    // Countdown Timer
    const startTimer = () => {
        const resetTime = new Date();
        resetTime.setHours(24, 0, 0, 0); // Reset at midnight
        const interval = setInterval(() => {
            const now = new Date();
            const diff = resetTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setDailyChallenge();
                startTimer();
            } else {
                const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
                const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
                const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
                timerElement.textContent = `${hours}:${minutes}:${seconds}`;
            }
        }, 1000);
    };

    // Mark Challenge as Complete
    if (completeChallengeBtn) {
        completeChallengeBtn.addEventListener('click', () => {
            if (!dailyChallenge.completed) {
                dailyChallenge.completed = true;
                localStorage.setItem(dailyChallengeKey, JSON.stringify(dailyChallenge));
                alert("Congratulations! You've completed today's challenge.");
                completeChallengeBtn.disabled = true;
                completeChallengeBtn.textContent = "Challenge Completed";
            } else {
                alert("You've already completed today's challenge.");
            }
        });

        if (dailyChallenge.completed) {
            completeChallengeBtn.disabled = true;
            completeChallengeBtn.textContent = "Challenge Completed";
        }
    }

    // Initialize the daily challenge and timer
    setDailyChallenge();
    startTimer();
});
