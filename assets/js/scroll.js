window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');

	window.onscroll = function() {scrollFunction()};

	var logoLg = document.getElementById("logo--lg")
	var logoMd = document.getElementById("logo--md")
	var logoSm = document.getElementById("logo--sm")
	var miniBio = document.getElementById("mini-bio")
	var backToTop = document.getElementById("back-to-top")

	backToTop.addEventListener("click", (event) => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	})

	function scrollFunction() {
		if (document.body.scrollTop > 10 ||
			document.documentElement.scrollTop > 10) {
			logoLg.style.fontSize = "2em"
			logoMd.style.fontSize = "2em"
			logoSm.style.fontSize = "1.5em"
			miniBio.style.opacity = "0%"
			miniBio.style.transform = "translate(0, -1em)"
			miniBio.style.height = "0"
			backToTop.style.opacity = "100%"
			backToTop.style.visibility = "visible"
			backToTop.style.bottom = "50px"
		} else {
			logoLg.style.fontSize = "4em"
			logoMd.style.fontSize = "3em"
			logoSm.style.fontSize = "2em"
			miniBio.style.opacity = "100%"
			miniBio.style.transform = "translate(0, 0)"
			miniBio.style.height = "auto"
			backToTop.style.opacity = "0%"
			backToTop.style.visibility = "hidden"
			backToTop.style.bottom = "30px"
		}
	}
});
