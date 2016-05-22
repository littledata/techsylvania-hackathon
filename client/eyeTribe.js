Tracker.autorun( () => {
	var ping = Pings.findOne();
	if (!ping) return;

	ping.y = ping.y - browserHeader * 2;

	var hotZoneTop = 200;

	if (ping.y < hotZoneTop || ping.y > window.outerHeight - 100) {
		var move = ( ping.y < hotZoneTop ) ? - 20 : 20;

		//scroll up or down
		$('html, body').scrollTop(window.scrollY + move)
		return;
	}

	if (ping.blinked != false) {
		console.log(ping.blinked);
		var $el = $(document.elementFromPoint(ping.x,ping.y))
		$el = ($el.is('div.report.row')) ? $el : $el.parent('div.report.row');

		if (ping.blinked == 'left') {
			console.log($el);
			var $star = $el.find('.starContainer');
			$star.toggleClass('star-up');
		}
		else if (ping.blinked == 'right') {
			console.log('here',ping.blinked);
			if ($el.hasClass('selected')) {
	            $el.removeClass('selected');
	            $el.children('.report-details-container').css('display', 'none');
	        } else {
	            $el.addClass('selected');
	            $el.children('.report-details-container').css('display', 'block');
	        }
		}
	}

})
