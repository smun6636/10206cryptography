document.addEventListener('DOMContentLoaded', () => {
    const storyContainer = document.getElementById('storyContainer');
    const storyText = document.getElementById('storyText');
    const nextStoryButton = document.getElementById('nextStoryButton');
    const quizContainer = document.getElementById('quizContainer');
    const pageIndicator = document.getElementById('pageIndicator');
    const questionTitle = document.getElementById('questionTitle');
    const userInput = document.getElementById('userInput');
    const result = document.getElementById('result');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
    const finalScore = document.getElementById('finalScore');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const inputForm = document.getElementById('inputForm');
    const label = inputForm.querySelector('label');

    const story = [
        "당신은 한국사 공부를 게을리 하여 일제 강점기 시대로 강제 이동 당하였습니다.",
        "그리고 그곳에서 친일파 의혹을 받아 심문을 당하게 됐습니다.",
        "한국사 지식으로 자신이 친일파가 아니라는 걸 증명하여 살아남으세요."
    ];

    const questions = [
        { question: "일제는 대공황 이후 농촌 경제가 피폐해지고, 소작 쟁의가 확산되자 한국 농민의 불만을 잠재우기 위해 ( )을 전개하였다.", answers: ["농촌진흥운동"] },
        { question: "1923년 백정들은 경남 진주에서 ( )를 조직하고 백정에 대한 사회적 차별 철폐를 주장하였다.", answers: ["조선형평사"] },
        { question: "농민 운동은 소작권 이동 반대 등 생존권을 요구하는 소작쟁의가 주를 이뤘고, 1923년 ( ) 소작 쟁의는 지주와 일본 경찰의 탄압에 맞서 소작료 인하 성공이란 성과를 거뒀다.", answers: ["암태도"] },
        { question: "일제는 한군의 값싼 노동력과 자원 효율적 수탈을 위한 병참기지화 정책을 펼쳤고, 1938년에는 ( )을 제정하여 본격적으로 인력과 물자 수탈에 나섰다.", answers: ["국가총동원법"] },
        { question: "일제는 내선일체와 일선 동조론을 내세우며 한국인을 일본인으로 동화시키려는 ( )을 시행하였다.", answers: ["민족 말살 정책"] },
        { question: "일제는 한국을 비롯한 식민지와 점령지의 여성들을 일본군 ( )로 동원하여 끔찍한 삶을 강요하였다.", answers: ["위안부"] },
        { question: "남만주에서는 양세봉을 필두로 한 ( )당에서 ( )군을 편성해 무장투쟁을 벌였다.", answers: ["조선혁명"] },
        { question: "관내에서 결성된 통일 항일 전선 민족혁명당은 조선 민족 전선 연맹을 결성하였고, 중국 국민당의 지원을 받아 ( )를 창설하였다.", answers: ["조선의용대"] },
        { question: "한국 광복 운동 단체 연합회의 3개의 정당이 합당하여 대한민국 임시 정부의 집권당인 ( )을 결성하였다.", answers: ["한국독립당"] },
        { question: "광복 이후 여운형이 건국 동맹을 기반으로 ( )를 조직하였다.", answers: ["조선 건국 준비 위원회"] },
        { question: "모스크바 3국 외상 회의의 ( )에 관한 논의로 국내 좌우 대립이 확산되었다.", answers: ["신탁통치"] },
        { question: "제 1차 미-소 공동 위원회 결렬 이후 단독 정부 수립 주장이 대두되며 분단의 조짐이 보이자, 여운형과 김규식 등 중도파는 ( )를 조직하여 통일 정부 수립 운동을 펼쳤다.", answers: ["좌우합작위원회"] }
    ];

    let storyIndex = 0;
    let currentQuestionIndex = 0;
    let score = 0;

    // 스토리 진행 버튼
    nextStoryButton.addEventListener('click', () => {
        if (storyIndex < story.length - 1) {
            storyIndex++;
            storyText.textContent = story[storyIndex];
            if (storyIndex === story.length - 1) {
                nextStoryButton.textContent = '퀴즈 시작';
            }
        } else {
            storyContainer.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            pageIndicator.classList.remove('hidden');
            loadQuestion();
        }
    });

    // 문제 로드 함수
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        pageIndicator.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        questionTitle.innerHTML = currentQuestion.question;
        label.textContent = '빈칸에 알맞는 말을 입력하세요:';
        userInput.value = '';
        userInput.removeAttribute('readonly');
        result.textContent = '';
        nextButton.classList.add('hidden');
        skipButton.classList.add('hidden');
        inputForm.querySelector('button').classList.remove('hidden');
    }

    // 정답 제출 처리
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userAnswer = userInput.value.trim().replace(/\s+/g, ''); // 입력값에서 모든 공백 제거
        const currentQuestion = questions[currentQuestionIndex];

        // 정답 배열의 모든 항목에서도 공백 제거 후 비교
        const normalizedAnswers = currentQuestion.answers.map(answer => answer.replace(/\s+/g, ''));
        if (normalizedAnswers.includes(userAnswer)) {
            result.textContent = '정답입니다!';
            result.style.color = 'green';
            nextButton.classList.remove('hidden');
            skipButton.classList.add('hidden');
            inputForm.querySelector('button').classList.add('hidden');
            userInput.setAttribute('readonly', true);
            score++;
        } else {
            result.textContent = '오답!';
            result.style.color = 'red';
            setTimeout(() => {
                result.textContent = '';
                skipButton.classList.remove('hidden');
            }, 1000);
        }
    });

    // 다음 문제 버튼
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    // 건너뛰기 버튼
    skipButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    // 최종 점수 화면
    function showFinalScore() {
        quizContainer.classList.add('hidden');
        finalScore.classList.remove('hidden');
        finalScore.querySelector('h2').textContent = '당신의 점수는?';
        scoreDisplay.textContent = `맞춘 개수 : ${score}/${questions.length}`;
    }

    // 초기 스토리 텍스트 설정
    storyText.textContent = story[storyIndex];
});
