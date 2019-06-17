/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
	//scroll navigation
	const content = document.querySelector('#main-content');
	const navElement = document.querySelector('header#chapter-nav');
	scrollnav.init(content, {
		sections: '.chapter-short-title',
		insertTarget: navElement,
		insertLocation: 'append',
		easingStyle: 'easeInOutQuad'
	});

	//reference tooltips
	const refFilePath = "assets/data/references.json";	
	fetch(refFilePath).then(res => {
		return res.json();
	}).then(data => {
		data.references.forEach(item => {
			const tooltipRef = document.getElementById(item.id);
			const tooltipText = item.html;
			tippy(tooltipRef, {
				//trigger: 'click',
				content: tooltipText,
				interactive: true,
				a11y: false,
				animation: 'fade' //"shift-away",  "shift-toward", "fade",  "scale", "perspective"
			})
		});
	});

	//readers guide menu
	const guideHandle = document.querySelector('.readers-guide-heading .section-heading');
	const guideWrapper = document.querySelector('.readers-guide-container');

	function toggleGuide() {
		guideHandle.addEventListener('click', () => {
			guideWrapper.classList.toggle('is-open');
		});
	}

	function bumpGuide() {
		guideHandle.addEventListener('mouseenter', () => {
			guideWrapper.classList.add('bump');
		});

		guideHandle.addEventListener('mouseleave', () => {
			guideWrapper.classList.remove('bump');
		});
	}

	toggleGuide();
	//bumpGuide();

	//accordion
	function addClass(el, klass) {
		el.classList.add(klass);
	}

	function removeClass(el, klass) {
		el.classList.remove(klass);
	}

	const accordionItems = document.querySelectorAll('.accordion-item');
	const accordionContentPanes = document.querySelectorAll('.accordion-item-content');

	accordionItems.forEach(function(item) {
		const accordionItemHeading = item.firstElementChild;
		accordionItemHeading.addEventListener('click', toggleAccordion);
	})

	function toggleAccordion(ev) {
		console.log('click fired');
		accordionContentPanes.forEach(function(content) {
			if (content.previousElementSibling === ev.target) {
				content.classList.toggle('hidden');
				content.parentElement.classList.toggle('active');
			} else {
				content.classList.add('hidden');
				content.parentElement.classList.remove('active');
			}
		});
	}

});