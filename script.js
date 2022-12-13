const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const metaBtn = document.getElementById('meta');
const loader = document.getElementById('loader');
const quoteDiv = document.getElementById('quoteDiv');

// Get quote from api
// https://api.quotable.io/random?tags=famous-quotes&minLength=100&maxLength=150

let apiQuote = {};
// loading
const loading = () => {
    loader.classList.add('loader')
    quoteDiv.hidden = true;
    authorName.hidden = true;
}
// hide loading
const complete = () => {
    loader.classList.remove('loader')
    quoteDiv.hidden = false;
    authorName.hidden = false;
}

//generate quote
const getQuote = async () => {
    const apiUrl = "https://api.quotable.io/random?tags=famous-quotes";
    try {
        const res = await fetch(apiUrl);
        const { author, content } = await res.json();
        apiQuote = { author, content }
    }
    catch (e) {
        console.log(e)
    }
}
//populate quote
const newQuote = async () => {
    loading()
    await getQuote();
    authorName.textContent = apiQuote.author;
    if (apiQuote.content.length > 200) {
        quoteText.classList.add('longQuoteText')
    } else {
        quoteText.classList.remove('longQuoteText')
    }
    quoteText.textContent = apiQuote.content;
    complete()

}
//tweet share quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
    // open a window in a new tab (by "_blank" command)
    window.open(twitterUrl, "_blank")
}
//meta share
const metaQuote = () => {
    const metaUrl = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdanilo-hung.github.io%2FQuoteGenerator%2F&amp;src=sdkpreparse'
    window.open(metaUrl, "_blank")
}

//btn trigger
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)
metaBtn.addEventListener('click', metaQuote)



