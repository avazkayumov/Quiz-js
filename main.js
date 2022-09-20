const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

const headerContainer = document.querySelector("#header")
const listContainer = document.querySelector("#list")
const submitBtn = document.querySelector("#submit")

let score = 0;
let questionIndex = 0;

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

function showQuestion() {
	console.log('showQuestion')

	//Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace("%title%", questions[questionIndex]['question'])
	headerContainer.innerHTML = title;


	//Вырианты ответов
	let answerNumber = 1
	for(answerText of questions[questionIndex]['answers']) {
	
		const questionTemplate = `
			<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
		`
		let answerHTML =  questionTemplate
								.replace('%answer%', answerText)
								.replace('%number%', answerNumber)
	
		listContainer.innerHTML += answerHTML;
		
		answerNumber++
	}
}

function checkAnswer() {
	console.log('checkanswer started')

	//Находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	//Если ответ не выбран - ничего не делаемб выходим из функции
	if (!checkedRadio) {
		submitBtn.blur()
		return; 
	}

	//Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)

	//Если ответил верно - увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}
	console.log('score =', score)

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage()
		showQuestion()
		return
	}else {
		clearPage()
		showResults()
	}
}

function showResults() {
	console.log('started')

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;	

	let title; 
	let message;

	//Варианты заголовков и текста 
	if (score === questions.length) {
		title = "Поздравляем! 🎉"
		message = 'Вы ответили верно на все вопросы! 😎👍' 
	}else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😉'
		message = 'Вы дали более половины правильных ответов! 👍'
	}else {
		title = 'Стоит постараться 😐'
		message = 'Пока у вас меньше половины правильных ответов!'
	}


	//Результат
	let result = `${score} из ${questions.length}`


	//Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result)

	headerContainer.innerHTML = finalMessage


	//Меняем кнопку на играть снова
	submitBtn.blur()
	submitBtn.innerText  = 'Начать заново'
	submitBtn.onclick = function() {
		history.go()
	} 
}