const toggle = document.querySelector('.toggle')
const menuNav = document.querySelector('.menu-nav')
const navItems = document.querySelectorAll('.nav-item')

toggle.addEventListener('click', toggleMenu)

function toggleMenu() {
  if (toggle.checked == true) {
    menuNav.classList.add('show')
    navItems.forEach((item) => item.classList.add('show'))
  } else {
    menuNav.classList.remove('show')
    navItems.forEach((item) => item.classList.remove('show'))
  }
}
