const quoteContainer = document.querySelector("#quote-container");
const quoteTextContainer = document.querySelector(".quote-text");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const facebookBtn = document.querySelector("#facebook");
const newQuoteBtn = document.querySelector("#new-quote");
const prevQuoteBtn = document.querySelector("#prev-quote");

// Save Quote history
let quoteHistory = [];
let currentQuote = null;
let apiQuotes = []; // Let instead of constant- because the value of the array will change

function applyQuote({ text, author }) {
  authorText.textContent = author || "Unknown";
  quoteText.classList.toggle("long-quote", text.length > 140);
  quoteText.textContent = text;
  
  setTimeout(() => {
    quoteTextContainer.scrollTop = 0;
  }, 0);
}

// Show new quote
function newQuote() {
  if (currentQuote) {
    quoteHistory.push(currentQuote); // Save the old before it changes
  }
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  currentQuote = quote;
  applyQuote(quote);
}

function prevQuote() {
  if (quoteHistory.length === 0) return;
  const previous = quoteHistory.pop();
  currentQuote = previous;
  applyQuote(previous);
}

prevQuoteBtn.addEventListener("click", prevQuote);

// Get Quotes from API, async fetch req within a try catch statement
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl); // This const will not be populated until it has data fetched from the API
    apiQuotes = await response.json(); // Turning response to a JSON object
    newQuote();
  } catch (error) {
    // Catch error
    console.error(error);
  }
}

//Share a quote, using template string with backtics
function facebookQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const quoteMessage = `"${quote}" - ${author}`;

  const shareUrl = "https://fagerdahl.github.io/quote-generator/";
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}&quote=${encodeURIComponent(quoteMessage)}`;

  window.open(facebookUrl, "_blank");
}

facebookBtn.addEventListener("click", facebookQuote);
newQuoteBtn.addEventListener("click", newQuote);

// Call the function
getQuotes();
