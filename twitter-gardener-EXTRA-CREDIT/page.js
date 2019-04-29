// TODO(you): Add your own positive messages if you'd like!
const POSITIVE_MESSAGES = [
  'You are worthy.',
  'You are enough.',
  'Be kind and forgiving to yourself.',
  'You are amazing.',
  'It\'s okay not to be okay.',
  'It\'s enough to just breathe.',
  'You are loved.',
  'I believe in you.',
  'You can do it!',
  'You are not a failure.',
  'You matter.',
  'Your life matters.'
];

const injectCSSRules = `
  .tweet:hover {
    background-image: url('${chrome.runtime.getURL('images/sparkle.gif')}');
    opacity: 0.8;
  }
  .tweet *:hover {
    cursor: url('${chrome.runtime.getURL('images/rose-cursor.gif')}') 4 12, auto;
  }
`;

const CSSInjection = document.createElement('style');
CSSInjection.textContent = injectCSSRules;

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(onMessage);
});

const state = {
  isGardening: false,
  lastTweetInjected: 0,
  lastPageHeight: 0,
}

function onMessage(gardeningInProgress) {
  // TODO(you): Implement this function for extra credit! Add helper functions
  // as needed.

  // NOTE: This extension is EXTRA CREDIT and is not required for HW2.

  // If `gardeningInProgress` is true, that means "Start Gardening" was clicked.
  // If `gardeningInProgress` is false, that means "Stop Gardening" was clicked.
  const { isGardening } = state;
  if (gardeningInProgress === true && isGardening === false) {
    state.isGardening = true;
    state.lastTweetInjected = 0;
    state.lastPageHeight = 0;
    document.head.appendChild(CSSInjection);
    addOnClickEvent();
    window.addEventListener('scroll', onScroll);
  }
  else if (gardeningInProgress === false && isGardening === true) {
    state.isGardening = false;
    document.head.removeChild(CSSInjection);
    removeOnClickEvent();
    window.removeEventListener('scroll', onScroll);
  }

}

function onClick({ currentTarget: root }) {
  event.stopPropagation();
  root.querySelectorAll('.tweet-text').forEach(value => {
    const index = Math.floor(Math.random() * POSITIVE_MESSAGES.length);
    value.textContent = POSITIVE_MESSAGES[index];
  });
}

function onScroll() {
  const { lastPageHeight } = state;
  const pageHeight = document.body.scrollHeight;
  if (lastPageHeight >= pageHeight) return;
  addOnClickEvent();
  state.lastPageHeight = pageHeight;
}

function addOnClickEvent() {
  const { lastTweetInjected } = state;
  const allTweets = document.querySelectorAll('.tweet');
  const newTweets = [...allTweets].slice(lastTweetInjected);
  newTweets.forEach(value => value.addEventListener('click', onClick));
  state.lastTweetInjected = allTweets.length;
}

function removeOnClickEvent() {
  const allTweets = document.querySelectorAll('.tweet');
  allTweets.forEach(value => value.removeEventListener('click', onClick));
}
