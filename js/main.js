const toggle = document.querySelector('.toggle')
const menuNav = document.querySelector('.menu-nav')
const navItems = document.querySelectorAll('.nav-item')
const txtElement = document.querySelector('.txt-type')

document.addEventListener('DOMContentLoaded', () => TypeWriter.start())
toggle.addEventListener('click', toggleMenu)

changeTheme('Light')
changeLanguage('ro')

function changeTheme(theme) {
	let link = document.createElement('link')
	link.setAttribute('rel', 'stylesheet')
	link.setAttribute('href', `css/style${theme}.css`)
	document.head.appendChild(link)
}

function changeLanguage(language) {
	document
		.querySelectorAll(`span[lang="${language}"]`)
		.forEach((e) => (e.style.display = 'block'))
	document
		.querySelectorAll(`span[lang="${language}-inline"]`)
		.forEach((e) => (e.style.display = 'inline'))
	document
		.querySelectorAll(`span[lang="${language == 'en' ? 'ro' : 'en'}"]`)
		.forEach((e) => (e.style.display = 'none'))
	document
		.querySelectorAll(`span[lang="${language == 'en' ? 'ro' : 'en'}-inline"]`)
		.forEach((e) => (e.style.display = 'none'))
	document
		.querySelectorAll('input[name="email"]')
		.forEach(
			(e) =>
				(e.placeholder = language == 'en' ? 'Email address' : 'Adresă de email')
		)
	document.querySelector('input[name="name"]').placeholder =
		language == 'en' ? 'Name' : 'Nume'
	document.querySelector('textarea[name="message"]').placeholder =
		language == 'en' ? 'Your message' : 'Mesaj'
}

function toggleMenu() {
	if (toggle.checked == true) {
		menuNav.classList.add('show')
		navItems.forEach((item) => item.classList.add('show'))
	} else {
		menuNav.classList.remove('show')
		navItems.forEach((item) => item.classList.remove('show'))
	}
}

// Type writer effect
class TypeWriter {
	constructor(txtElement, words, wait) {
		this.txtElement = txtElement
		this.words = words
		this.txt = ''
		this.wordIndex = 0
		this.wait = parseInt(wait, 10)
		this.isDeleting = false
		this.type()
	}
	type() {
		const current = this.wordIndex % this.words.length
		const fullText = this.words[current]
		let typeSpeed = 150
		if (this.isDeleting) {
			this.txt = fullText.substring(0, this.txt.length - 1)
			typeSpeed /= 2
		} else {
			this.txt = fullText.substring(0, this.txt.length + 1)
		}
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
		this.txtElement.style.display = 'inline'
		if (!this.isDeleting && this.txt === fullText) {
			this.isDeleting = true
			typeSpeed = this.wait
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false
			this.wordIndex++
			typeSpeed = 500
			this.txtElement.style.display = 'none'
		}
		// Cyclic function call
		setTimeout(() => this.type(), typeSpeed)
	}
	static start() {
		const words = JSON.parse(txtElement.getAttribute('data-words'))
		const wait = txtElement.getAttribute('data-wait')
		new TypeWriter(txtElement, words, wait)
	}
}
