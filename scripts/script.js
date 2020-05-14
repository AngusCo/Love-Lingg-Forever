jQuery(function ($) {

	var supportsAudio = !!document.createElement('audio').canPlayType;

	if (supportsAudio) {

		// 初始化 Plyr
		var player = new Plyr('#player', {
			controls: [
				'restart',
				'play',
				'progress',
				'current-time',
				'duration'
			]
		});

		// 宣告與初始控制
		var index = 0,
			playing = false,
			mediaPath = "./",
			buildPlaylist = $.each(tracks, function(key, value) {
				var trackNumber = value.track,
					trackTopic = value.topic,
					trackName = value.name,
					trackDuration = value.duration;
				if (trackNumber.toString().length === 1) {
					trackNumber = '0' + trackNumber;
				}
				$('#plList').append('<li> \
					<div class="plItem"> \
						<span class="plTopic">' + trackTopic + ' </span> \
					</div> \
					<div class="plItem"> \
						<span class="plNum">' + trackNumber + '.</span> \
						<span class="plTitle">' + trackName + '</span> \
						<span class="plLength">' + trackDuration + '</span> \
					</div> \
				</li>');
			}),
			trackCount = tracks.length,

			// 顯示文字
			npAction = $('#npAction'),
			npTitle = $('#npTitle'),

			// 音樂播放器控制
			audio = $('#player').on('play', function () {
				playing = true;
				npAction.text('Now Playing...');
			}).on('pause', function () {
				playing = false;
				npAction.text('Paused...');
			}).on('ended', function () {
				npAction.text('Paused...');

				index++;
				if (index == trackCount) {
					index = 0;
					audio.pause();
					loadTrack(index);
				} else {
					playTrack(index);
				}
			}).get(0),

			// 前一首
			btnPrev = $('#btnPrev').on('click', function () {
				index--;

				if (index < 0) {
					index = 13;
				}

				if (playing) {
					playTrack(index);
				} else {
					loadTrack(index);
				}
			}),

			// 下一首
			btnNext = $('#btnNext').on('click', function () {
				index++;

				if (index == trackCount) {
					index = 0;
				}

				if (playing) {
					playTrack(index);
				} else {
					loadTrack(index);
				}
			}),

			// 點擊曲目選單
			li = $('#plList li').on('click', function () {
				var id = parseInt($(this).index());
				
				if (id != index) {
					playTrack(id);
				} else if (!playing) {
					audio.play();
				}
			}),

			// 讀取音樂
			loadTrack = function (id) {
				npTitle.text(tracks[id].track + '. ' + tracks[id].name);
				document.title = tracks[id].name;
				index = id;
				audio.src = mediaPath + tracks[id].file;
			},

			// 播放音樂
			playTrack = function (id) {
				loadTrack(id);
				audio.play();
			};

		// 預載第一首歌
		loadTrack(index);
	} else {
		// no audio support
		$('.column').addClass('hidden');
		var noSupport = $('#player').text();
		$('.container').append('<p class="no-support">' + noSupport + '</p>');
	}
});