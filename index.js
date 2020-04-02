$(function(){
	/* DAVID GEREN, 20200328
		NOTE: this is a demo app for the logic. It is not meant to follow MVC or be
		any more than a proof of concept. */

	let testData = {
		category: 'Questions Three',
		question: 'What is your favorite color?',
		answer: '#o•item 1• •item 2•#o'
	};

	const elements = {
		quizQuestionField: $('#questionHtml'),
		quizAnswerField: $('#answerHtml'),
		editQuestionField: $('#questionMarkdown'),
		editAnswerField: $('#answerMarkdown'),
		btnToggle: $('#btnToggle'),
		html: $('#html'),
		markdown: $('#markdown'),
		btnSave: $('#save')
	}
	let content = { question: null, answer: null}

	// STORE THE INTIAL DATA AND ANY CHANGED DATA
	const setContent = (data) => {
		if(!(data.question || data.answer)) {
			data = getLocalStorage();
		}
		content.question = data.question;
		content.answer = data.answer;
		updateLocalStorage();
	}

	// RETRIEVE DATA FROM THE PAGE
	const getData = () => ({
		question: elements.editQuestionField.val(),
		answer: elements.editAnswerField.val()
	});

	// CONTROL UPDATING THE VIEW
	const toggleView = () => {
		let label = 'Switch to Quiz Mode';
		if(elements.markdown.is(':visible')) {
			setContent(getData());
			label = 'Switch to Edit Mode';
		}
		elements.btnToggle.html(label);
		displayContent();
		elements.html.toggle();
		elements.markdown.toggle();
	}

	// SAVE CHANGES WITHOUT FORCING THE USER TO SWITCH TO QUIZ MODE
	const save = () => {
		setContent(getData());
		updateLocalStorage();
	}

	const getLocalStorage = () => {
		const data = JSON.parse(localStorage.getItem('data'));
		return data.question || data.answer ? data : {
			question: testData.question,
			answer: testData.answer
		};
	}

	const updateLocalStorage = () => {
		localStorage.setItem(
			'data',
			JSON.stringify({
				"question": content.question,
				"answer": content.answer
			})
		);
	}

	// CONVERT MARKDOWN TO HTML
	const toHTML = (str) => {
		return str
			.replace(/```([^]+?.*?[^]+?[^]+?)```/g, '<pre><code>$1</code></pre>')
			.replace(/`([^]+?.*?[^]+?[^]+?)`/g, '<code>$1</code>')
			.replace(/«([^]+?.*?[^]+?[^]+?)»/g, '<p>$1</p>')
			.replace(/\*\*([^]+?.*?[^]+?[^]+?)\*\*/g,  '<strong>$1</strong>')
			.replace(/\*([^]+?.*?[^]+?[^]+?)\*/g, '<em>$1</em>')
			.replace(/\_([^]+?.*?[^]+?[^]+?)\_/g, '<u>$1</u>')
			.replace(/#o([^]+?.*?[^]+?[^]+?)#o/g, '<ol>$1</ol>')
			.replace(/#u([^]+?.*?[^]+?[^]+?)#u/g, '<ul>$1</ul>')
			.replace(/•([^]+?.*?[^]+?[^]+?)•/g, '<li>$1</li>')
			;
	}

	// UPDATE THE VIEW
	const displayContent = () => { 
		elements.quizQuestionField.html(toHTML(content.question));
		elements.quizAnswerField.html(toHTML(content.answer));
		elements.editQuestionField.val(content.question);
		elements.editAnswerField.val(content.answer);
	}

	// INITIALIZE APP
	elements.btnToggle.on('click', toggleView);
	elements.btnSave.on('click', save);
	setContent(content);
	displayContent();
});

// match string before x /([^x]+)/ matches 800 in 800x600
// match string after 