const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const facebookBtn = document.querySelector('#facebook');
const newQuoteBtn = document.querySelector('#new-quote');

let apiQuotes = []; // Let instead of constant- because the value of the array will change

// Show new quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author is blank and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  
  quoteText.textContent = quote.text;

} 

// Get Quotes from API, async fetch req within a try catch statement
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl); // This const will not be populated until it has data fetched from the API
    apiQuotes = await response.json(); // Turning response to a JSON object
    newQuote();
  } catch (error) {
    // Catch error
  }
}

// Call the function
getQuotes();
