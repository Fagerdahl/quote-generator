let apiQuotes = []; // Let instead of constant- because the value of the array will change

// Show new quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
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
