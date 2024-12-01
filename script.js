document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const quizContainer = document.getElementById('quizContainer');
    const questionTitle = document.getElementById('questionTitle');
    const userInput = document.getElementById('userInput');
    const result = document.getElementById('result');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
    const finalScore = document.getElementById('finalScore');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const inputForm = document.getElementById('inputForm');
    const greeting = document.getElementById('greeting');
    const label = inputForm.querySelector('label'); // 라벨 요소

    const questions = [
        { question: "일제는 대공황 이후 농촌 경제가 피폐해지고, 소작 쟁의가 확산되자 한국 농민의 불만을 잠재우기 위해 ( )을 전개하였다.", answers: ["농촌진흥운동"] },
        { question: "1923년 백정들은 경남 진주에서 ( )를 조직하고 백정에 대한 사회적 차별 철폐를 주장하였다.", answers: ["조선형평사"] },
        { question: "농민 운동은 1927년에 결성된 ( )의 지원으로 규모와 조직 면에서 한층 발전하였다.", answers: ["조선농민총동맹"] },
        { question: "일제는 1938년 ( )을 제정하여 본격적으로 인력과 물자 수탈에 나섰다.", answers: ["국가총동원법"] },
        { question: "남만주에서는 양세봉을 필두로 한 ( )에서 군을 편성해 무장투쟁을 벌였다.", answers: ["조선혁명"] },
        { question: "화북으로 이동한 일부는 ( )를 결성하였다.", answers: ["조선의용대"] }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startButton.addEventListener('click', () => {
        greeting.classList.add('hidden'); // "반갑습니다" 문구 숨기기
        startButton.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    });

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionTitle.innerHTML = currentQuestion.question;
        label.textContent = '빈칸에 알맞는 말을 입력하세요:'; // 라벨 문구 변경
        userInput.value = '';
        userInput.removeAttribute('readonly'); // 입력란 활성화
        result.textContent = '';
        nextButton.classList.add('hidden');
        skipButton.classList.add('hidden'); // 문제 로딩 시 "건너뛰기" 버튼 숨기기
        inputForm.querySelector('button').classList.remove('hidden'); // "확인" 버튼 표시
    }

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswer = userInput.value.trim().replace(/\s+/g, ""); // 입력값의 모든 공백 제거
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswers = currentQuestion.answers.map(answer => answer.replace(/\s+/g, "")); // 정답의 모든 공백 제거

        if (correctAnswers.includes(userAnswer)) {
            result.textContent = '정답입니다!';
            result.style.color = 'green';
            nextButton.classList.remove('hidden'); // "다음 문제" 버튼 표시
            skipButton.classList.add('hidden'); // "건너뛰기" 버튼 숨기기
            inputForm.querySelector('button').classList.add('hidden'); // "확인" 버튼 숨기기
            userInput.setAttribute('readonly', true); // 입력란 비활성화
            score++;
        } else {
            result.textContent = '오답!';
            result.style.color = 'red';
            setTimeout(() => {
                result.textContent = '';
                skipButton.classList.remove('hidden'); // 오답 시 "건너뛰기" 버튼 표시
            }, 1000);
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    skipButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    function showFinalScore() {
        quizContainer.classList.add('hidden');
        finalScore.classList.remove('hidden');
        scoreDisplay.textContent = `총 ${questions.length}문제 중 ${score}문제를 맞추셨습니다.`;
    }
});
