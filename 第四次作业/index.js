const quotes = [
	'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// Array for storing the words of the current challenge
let words = [];
// Stores the index of the word the player is currently typing
let wordIndex = 0;
// Default value for startTime (will be set on start)
let startTime = Date.now();

// Grab UI items
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const bestTimeElement = document.getElementById('bestTime');

document.getElementById('start').addEventListener('click', function () {
	// Get a quote
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Enable the text input
	typedValueElement.disabled = false;
	// Set up the input event listener
	typedValueElement.addEventListener('input', onInput);
	// Put the quote into an array of words
	words = quote.split(' ');
	// Reset the word index for tracking
	wordIndex = 0;

	// UI updates
	quoteElement.innerHTML = words.map(word => `<span>${word} </span>`).join('');
	quoteElement.childNodes[0].className = 'highlight';
	messageElement.innerText = '';
	typedValueElement.value = '';
	typedValueElement.focus();

	// Start the timer
	startTime = Date.now();
});

function onInput() {
	const currentWord = words[wordIndex];
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// End of the quote
		const elapsedTime = Date.now() - startTime;
		const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
		const time_new = elapsedTime / 1000;

		const currentBestTime = parseFloat(localStorage.getItem('bestTime'));

		if (!currentBestTime || time_new < currentBestTime) {
			localStorage.setItem('bestTime', time_new);
		}

		displayBestTime();

		messageElement.innerText = message;
		typedValueElement.disabled = true;
		typedValueElement.removeEventListener('input', onInput);
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// End of the word
		typedValueElement.value = '';
		wordIndex++;
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		typedValueElement.className = '';
	} else {
		typedValueElement.className = 'error';
	}
}

function displayBestTime() {
	const bestTime = localStorage.getItem('bestTime');
	if (bestTime) {
		bestTimeElement.innerText = `Best Score: ${bestTime} seconds`;
	}
}

displayBestTime();
