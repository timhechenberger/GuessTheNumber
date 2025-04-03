document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const restartButton = document.getElementById('restartButton');
    const message = document.getElementById('message');
    const attempts = document.getElementById('attempts');
    const history = document.getElementById('history');
    
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attemptCount = 0;
    
    guessButton.addEventListener('click', checkGuess);
    restartButton.addEventListener('click', initGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });
    
    function checkGuess() {
        const guess = parseInt(guessInput.value);
        
        if (isNaN(guess)) {
            setMessage('Please enter a valid number!', 'error');
            return;
        }
        
        if (guess < 1 || guess > 100) {
            setMessage('Number must be between 1 and 100!', 'error');
            return;
        }
        
        attemptCount++;
        attempts.textContent = `Attempts: ${attemptCount}`;
        
        // Update history
        const guessElement = document.createElement('div');
        guessElement.textContent = guess;
        history.appendChild(guessElement);
        
        if (guess === secretNumber) {
            setMessage(`Congratulations! You found the number ${secretNumber}!`, 'success');
            guessInput.disabled = true;
            guessButton.disabled = true;
        } else if (guess < secretNumber) {
            setMessage('Too low! Try a higher number.', 'warning');
        } else {
            setMessage('Too high! Try a lower number.', 'warning');
        }
        
        guessInput.value = '';
        guessInput.focus();
    }
    
    function setMessage(msg, type) {
        message.textContent = msg;
        message.style.color = {
            'error': 'var(--error)',
            'success': 'var(--success)',
            'warning': 'var(--warning)'
        }[type] || 'var(--light)';
    }
    
    function initGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attemptCount = 0;
        guessInput.disabled = false;
        guessButton.disabled = false;
        guessInput.value = '';
        guessInput.focus();
        message.textContent = 'Enter your first guess...';
        message.style.color = 'var(--light)';
        attempts.textContent = 'Attempts: 0';
        history.innerHTML = '';
    }
});