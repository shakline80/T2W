(function ($) {
	"use strict";

	jQuery(document).ready(function () {

		function smoothScrollTop() {
			$('a[href^="#"]').on("click", function (event) {
				 let targetID = $(this).attr("href"); // Get the target ID
				 let target = $(targetID);
	  
				 if (target.length) {
					  event.preventDefault();
	  
					  // Remove 'active' class from all links
					  $('.mainmenu-nav ul li a').removeClass('active');
	  
					  // Add 'active' class to clicked link
					  $(this).addClass('active');
	  
					  // Get dynamic header height
					  let headerHeight = $(".header-area").outerHeight() || 0;
	  
					  // Ensure correct scrolling position
					  let targetOffset = target.offset().top - headerHeight - 10;
	  
					  // Animate scrolling
					  $("html, body").stop().animate({
							scrollTop: targetOffset
					  }, 800, "swing");
				 }
			});
	  }
	  
	  // Sticky Header Logic
	  let isSticky = false;
	  
	  function stickyHeader() {
			let header = $(".header-area");
			let scrollTop = $(window).scrollTop();
			let headerHeight = header.outerHeight(); // Get dynamic height
			let scrollThreshold = headerHeight * 2; // Set threshold
	  
			if (scrollTop > scrollThreshold && !isSticky) {
				 header.addClass("sticky").css({ top: `-${headerHeight}px` });
	  
				 setTimeout(() => {
					  header.css("top", "0px");
				 }, 10);
	  
				 isSticky = true;
			} else if (scrollTop <= scrollThreshold && isSticky) {
				 header.css("top", `-${headerHeight}px`);
				 setTimeout(() => {
					  header.removeClass("sticky").css("top", "");
				 }, 400);
	  
				 isSticky = false;
			}
	  }
	  
	  // Improved Scroll Spy for Active Links
	  function scrollSpy() {
			let scrollPos = $(document).scrollTop() + $(".header-area").outerHeight() + 20; // Add extra margin
	  
			$('.mainmenu-nav ul li a').each(function () {
				 let targetID = $(this).attr("href");
				 let target = $(targetID);
	  
				 if (target.length) {
					  let targetTop = target.offset().top - $(".header-area").outerHeight() - 10; // Adjust for sticky header
					  let targetBottom = targetTop + target.outerHeight();
	  
					  if (scrollPos >= targetTop && scrollPos < targetBottom) {
							$('.mainmenu-nav ul li a').removeClass('active'); // Remove active from all
							$(this).addClass('active'); // Add to current section
					  }
				 }
			});
	  }
	  
	  // Run functions when document is loaded
	  document.documentElement.style.scrollBehavior = "auto"; // Disable default smooth scrolling
	  $(document).ready(function () {
			smoothScrollTop();
			stickyHeader();
			scrollSpy();
	  });
	  
	  // Run functions on scroll & resize
	  $(window).on("scroll resize", function () {
			stickyHeader();
			scrollSpy();
	  });
	  


		// ===== Responsive Menu Toggle
		$(".menu-trigger").click(function () {
			$(".menu-trigger, .mainmenu-nav, .overlay-bg").toggleClass("active");
		});

		$(".mainmenu-nav li a, .overlay-bg").click(function () {
			$(".menu-trigger, .mainmenu-nav, .overlay-bg").removeClass("active");
		});

		// ===== Initialize AOS (Animate On Scroll) Library
		AOS.init();
	});

}(jQuery));