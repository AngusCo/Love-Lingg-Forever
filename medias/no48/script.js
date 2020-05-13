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
				"name": "2020年3月號 - 小行星幼兒誌",
				"duration": "03:06",
				"file": "01.mp3"
			},{
				"track": 2,
				"name": "情緒劇場 - 特別的種子",
				"duration": "05:45",
				"file": "02.mp3"
			},{
				"track": 3,
				"name": "幼年童話 - 小馬尾的小紅傘",
				"duration": "05:45",
				"file": "03.mp3"
			},{
				"track": 4,
				"name": "讀首小詩 - 早晨的花",
				"duration": "02:16",
				"file": "04.mp3"
			},{
				"track": 5,
				"name": "動物新鮮事 - 小瓢蟲真漂亮",
				"duration": "03:33",
				"file": "05.mp3"
			},{
				"track": 6,
				"name": "腦筋急轉彎 - 你會遵守規定嗎？",
				"duration": "03:08",
				"file": "06.mp3"
			},{
				"track": 7,
				"name": "小小探索家 - 曇花為什麼晚上開？",
				"duration": "05:04",
				"file": "07.mp3"
			},{
				"track": 8,
				"name": "身體怎麼了 - 我的耳朵悶悶的",
				"duration": "04:41",
				"file": "08.mp3"
			},{
				"track": 9,
				"name": "故事音樂盒 - 牙仙子",
				"duration": "08:04",
				"file": "09.mp3"
			},{
				"track": 10,
				"name": "英文童謠 - Lucy Locket",
				"duration": "04:35",
				"file": "10.mp3"
			},{
				"track": 11,
				"name": "世界大不同 - 拜訪春天的荷蘭鬱金香",
				"duration": "04:32",
				"file": "11.mp3"
			},{
				"track": 12,
				"name": "故事摩天輪 - 老鼠阿卷",
				"duration": "05:04",
				"file": "12.mp3"
			},{
				"track": 13,
				"name": "知識讀本 - 摺紙童詩：春天的鬧鐘",
				"duration": "12:48",
				"file": "13.mp3"
			},{
				"track": 14,
				"name": "2020年3月號 - 小行星的祝福",
				"duration": "03:01",
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