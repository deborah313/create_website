const questions = [
    { question: 'Where does Deborah study computer science?', answers: ['Texas Tech University', 'Rice University', 'University of Houston'], correct: 0, fact: 'Deborah joined Texas Tech’s Whitacre College of Engineering in Fall 2025.' },
    { question: 'Which role does Deborah hold at CodePath?', answers: ['Social Media Director', 'Vice President of Operations', 'President'], correct: 1, fact: 'As Vice President of Operations, she helps organize workshops and manage logistics.' },
    { question: 'Which game might you catch Deborah playing?', answers: ['Stardew Valley', 'Minecraft', 'Osu!'], correct: 2, fact: 'When she isn’t coding, Deborah enjoys playing Osu!.' }
];

const quiz = document.getElementById('quiz');
const tip = document.getElementById('tip');
const receipt = document.getElementById('receipt');
const questionHeading = document.getElementById('question');
const answers = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const next = document.getElementById('next');
let current = 0;
let score = 0;
let answered = false;

function showQuestion(moveFocus = true) {
    answered = false;
    const item = questions[current];
    document.getElementById('progress').textContent = `Question ${current + 1} of ${questions.length}`;
    questionHeading.textContent = item.question;
    feedback.textContent = '';
    next.hidden = true;
    next.textContent = current === questions.length - 1 ? 'See my score →' : 'Next question →';
    answers.replaceChildren();
    item.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = answer;
        button.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            const correct = index === item.correct;
            if (correct) score++;
            for (const option of answers.children) option.setAttribute('aria-disabled', 'true');
            button.classList.add(correct ? 'answer-correct' : 'answer-incorrect');
            answers.children[item.correct].classList.add('answer-correct');
            feedback.textContent = `${correct ? 'Correct!' : `Not quite — the answer is ${item.answers[item.correct]}.`} ${item.fact}`;
            next.hidden = false;
        });
        answers.append(button);
    });
    if (moveFocus) questionHeading.focus();
}

next.addEventListener('click', () => {
    if (!answered) return;
    current++;
    if (current < questions.length) return showQuestion();
    quiz.hidden = true;
    tip.hidden = false;
    document.getElementById('score').textContent = `You got ${score} out of ${questions.length}! ${score === questions.length ? 'Certified Deborah expert.' : 'Thanks for getting to know me.'}`;
    document.getElementById('tip-heading').focus();
});

document.querySelectorAll('[data-tip]').forEach(button => {
    button.addEventListener('click', () => {
        tip.hidden = true;
        receipt.hidden = false;
        document.getElementById('tip-message').textContent = button.dataset.tip === '0'
            ? 'No tip? No problem. Your time was the real treat.'
            : `An imaginary ${button.dataset.tip}% tip! Your imaginary generosity is very real to me.`;
        document.getElementById('receipt-heading').focus();
    });
});

document.getElementById('restart').addEventListener('click', () => {
    current = 0;
    score = 0;
    receipt.hidden = true;
    quiz.hidden = false;
    showQuestion();
});

quiz.hidden = false;
showQuestion(false);
