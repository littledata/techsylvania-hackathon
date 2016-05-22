var pause = false;

Tracker.autorun( () => {
	var ping = Pings.findOne();
	if (!ping) return;

	ping.y = ping.y - browserHeader;

	var hotZoneTop = 200;

	if (ping.y < hotZoneTop || ping.y > window.outerHeight - 100) {
		var move = ( ping.y < hotZoneTop ) ? - 20 : 20;

		// console.log('move',move)
		//scroll up or down
		$('html, body').scrollTop(window.scrollY + move)
		return;
	}
	console.log(pause)
	if (ping.blinked != false && !pause) {
		pause = true
		Meteor.setTimeout(()=>{
			pause = false
		},500);
		var $el = $(document.elementFromPoint(ping.x,ping.y))
		$el = ($el.is('div.report.row')) ? $el : $el.parent('div.report.row');

		if (ping.blinked == 'left') {
			var $star = $el.find('.starContainer');
			$star.toggleClass('star-up');
		}
		else if (ping.blinked == 'right') {
			if ($el.hasClass('selected')) {
	            $el.removeClass('selected');
	            $el.children('.report-details-container').css('display', 'none');
	            $el.children('.report_header').removeClass('selected');
	        } else {
				console.log('blinked here');
	            $el.addClass('selected');
	            $el.children('.report-details-container').css('display', 'block');
	            $el.children('.report_header').addClass('selected');
	        }
		}
	}

})
