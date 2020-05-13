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
			// -----------------
			// 請設定這些路徑與檔名
			// -----------------
			mediaPath = "./",
			tracks = [{
				"track": 1,
				"name": "2017年3月號小行星幼兒誌",
				"duration": "01:35",
				"file": "01.mp3"
			},{
				"track": 2,
				"name": "小星星 - 氣球破掉了",
				"duration": "03:21",
				"file": "02.mp3"
			},{
				"track": 3,
				"name": "幼年童話 - 糖果亮了",
				"duration": "06:21",
				"file": "03.mp3"
			},{
				"track": 4,
				"name": "身體怎麼了 - 原來是腸胃炎",
				"duration": "04:02",
				"file": "04.mp3"
			},{
				"track": 5,
				"name": "動物新鮮事 - 小蜜蜂採花蜜",
				"duration": "03:32",
				"file": "05.mp3"
			},{
				"track": 6,
				"name": "情緒繪本 - 我會做自己的事",
				"duration": "06:27",
				"file": "06.mp3"
			},{
				"track": 7,
				"name": "讀首小詩 - 春天",
				"duration": "03:07",
				"file": "07.mp3"
			},{
				"track": 8,
				"name": "小小探索家 - 為什麼會被電到？",
				"duration": "04:42",
				"file": "08.mp3"
			},{
				"track": 9,
				"name": "工作放大鏡 - 了不起的建築師",
				"duration": "03:52",
				"file": "09.mp3"
			},{
				"track": 10,
				"name": "快樂動身體 - 春天的花朵",
				"duration": "03:07",
				"file": "10.mp3"
			},{
				"track": 11,
				"name": "世界大不同 - 越南水上生活真有趣",
				"duration": "04:35",
				"file": "11.mp3"
			},{
				"track": 12,
				"name": "英文童謠 - Ring A Round The Rosie",
				"duration": "04:52",
				"file": "12.mp3"
			},{
				"track": 13,
				"name": "翻轉童話 - 豌豆公主",
				"duration": "04:11",
				"file": "13.mp3"
			},{
				"track": 14,
				"name": "2017年3月號小行星的祝福",
				"duration": "01:22",
				"file": "14.mp3"
			}],
			// -------
			// 設定結束
			// -------
			buildPlaylist = $.each(tracks, function(key, value) {
				var trackNumber = value.track,
						trackName = value.name,
						trackDuration = value.duration;
				if (trackNumber.toString().length === 1) {
						trackNumber = '0' + trackNumber;
				}
				$('#plList').append('<li> \
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