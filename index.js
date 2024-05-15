// Accessing DOM elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.querySelectorAll('.message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Game state variables
let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Function to generate a random number within a given range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check the player's guess against the target number
function checkGuess() {
  const guess = parseInt(guessInput.value, 10);
  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert('Please enter a number between 1 and 99.');
    return;
  }

  attempts += 1;
  hideAllMessages(); // Hide all messages before showing new ones

  // Check if the guess is correct, too high, or too low
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses.`;
    correctMessage.style.display = 'block';
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guess < targetNumber) {
    tooLowMessage.style.display = 'block';
  } else {
    tooHighMessage.style.display = 'block';
  }

  // Calculate remaining attempts and display appropriate messages
  let remainingAttempts = maxNumberOfAttempts - attempts;
  numberOfGuessesMessage.style.display = 'block';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

  // Disable the game if maximum attempts are reached
  if (remainingAttempts === 0) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = 'block';
  }

  guessInput.value = ''; // Clear input field
  resetButton.style.display = 'block'; // Show reset button
}

// Function to hide all dynamic messages
function hideAllMessages() {
  messages.forEach(element => {
    element.style.display = 'none';
  });
}

// Setup the game: initialize variables and UI state
function setup() {
  targetNumber = getRandomNumber(1, 99); // Set a new target number
  console.log(`Target number: ${targetNumber}`); // Log the target number for debugging
  attempts = 0;
  submitButton.disabled = false;
  guessInput.disabled = false;
  hideAllMessages();
  resetButton.style.display = 'none'; // Hide reset button at start
  guessInput.value = ''; // Clear any previous input
}

// Event listeners for button clicks
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initial game setup
setup();
