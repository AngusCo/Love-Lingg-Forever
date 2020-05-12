jQuery(function ($) {

	var supportsAudio = !!document.createElement('audio').canPlayType;

	if (supportsAudio) {
		// initialize plyr
		var player = new Plyr('#player', {
			controls: [
				'restart',
				'play',
				'progress',
				'current-time',
				'duration',
				'mute',
				'volume'
			]
		});



		
		// initialize controls
		// var index = 0,
		// 		li = $('#plList li').on('click', function () {
		// 			var id = parseInt($(this).index());
		// 			console.log(id);
		// 			player.source = {
		// 				type: 'audio',
		// 				title: 'test title',
		// 				source: [
		// 					{
		// 						src: '/Medias/no50/01.mp3',
		// 						type: 'audio/mp3',
		// 					},
		// 				],
		// 			};
		// 		}),
		// 		audio = $('#player').on('play', function() {

		// 		}

	} else {
		// no audio support
		$('.column').addClass('hidden');
		var noSupport = $('#player').text();
		$('.container').append('<p class="no-support">' + noSupport + '</p>');
	}
});