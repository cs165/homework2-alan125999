// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const questionIds = ['one', 'two', 'three'];
const state = {
  chosenIds: new Array(3).fill(null),
  finish: false,
};

function choiceOnClick({ currentTarget }) {
  // Check if them exam is finished
  if (state.finish) return;

  // Choose
  const { choiceId, questionId } = currentTarget.dataset;
  choose(choiceId, questionId);
}

function choose(choice, question) {
  const { chosenIds } = state;
  const questionIndex = questionIds.indexOf(question);

  if (chosenIds[questionIndex] === choice) return;

  chosenIds[questionIndex] = choice;
  rerender(questionIndex);
  if (chosenIds.every(value => value !== null)) conclude();
}

function rerender(questionIndex) {
  const { chosenIds } = state;
  const question = questionIds[questionIndex];
  const chosenId = chosenIds[questionIndex];

  const choices = document.querySelectorAll(`[data-question-id='${question}']`);
  choices.forEach(value => {
    const { choiceId } = value.dataset;
    const checkBox = value.querySelector('img:last-child');

    if (choiceId === chosenId) {
      value.classList.add('chosen');
      value.classList.remove('unchosen');
      checkBox.src = 'images/checked.png';
    }
    else {
      value.classList.add('unchosen');
      value.classList.remove('chosen');
      checkBox.src = 'images/unchecked.png';
    }
  })
}

function conclude() {
  state.finish = true;
  const { chosenIds } = state;
  let ans = chosenIds[0];
  if (chosenIds[1] === chosenIds[2]) ans = chosenIds[1];

  const { title, contents } = RESULTS_MAP[ans];
  const conclusion = document.querySelector('.conclusion');
  const conclusionTitle = conclusion.querySelector('.conclusion-title');
  const conclusionContent = conclusion.querySelector('.conclusion-content');
  conclusion.classList.remove('hidden');
  conclusionTitle.textContent = `You got: ${title}`;
  conclusionContent.textContent = contents;
}

function restart() {
  state.chosenIds.fill(null);
  state.finish = false;
  const allChoices = document.querySelectorAll('.choice-grid > div');
  allChoices.forEach(value => {
    value.classList.remove('unchosen');
    value.classList.remove('chosen');
    const checkBox = value.querySelector('img:last-child');
    checkBox.src = 'images/unchecked.png';
  })
  document.body.scrollIntoView();
  const conclusion = document.querySelector('.conclusion');
  conclusion.classList.add('hidden');
}

const allChoices = document.querySelectorAll('.choice-grid > div');
allChoices.forEach(value => value.addEventListener('click', choiceOnClick));

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', restart);