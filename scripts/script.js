document.addEventListener('DOMContentLoaded', function(e) {

    var setting = {
        index: 0,
        playing: false,
    }

    var playlist = [];


    function checkAudioSupport() {
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
            console.log('播放器初始化完成');
            playlistInit();
        }
        else {
            // no audio support
            $('.column').addClass('hidden');
            var noSupport = $('#player').text();
            $('.container').append('<p class="no-support">' + noSupport + '</p>');
            console.log('不支援音樂播放');
        }
    }

    function playlistInit() {
        fileInfo.forEach(function(info) {
            playlist.push(
                {
                    album: info.album,
                    topic: info.title.split(' ')[0],
                    title: info.title.substring(info.title.split(' ')[0].length),
                    track: info.track,
                    duration: info.duration,
                    file: info.file
                }
            );
        }, this);

        // 處理第一首 title, topic
        playlist[0].title = playlist[0].topic.split('號')[1];
        playlist[0].topic = playlist[0].topic.split('號')[0] + '號';
        
        // 處理最後一首 title, topic
        var last = playlist.length - 1;
        playlist[last].title = playlist[last].topic.split('號')[1];
        playlist[last].topic = playlist[last].topic.split('號')[0] + '號';

        createPlaylist();
    }

    function createPlaylist() {
        playlist.forEach(function(trackInfo) {
            // 產生網頁元素
            $('#plList').append('<li> \
                <div class="plItem"> \
                    <span class="plTopic">' + trackInfo.topic + ' </span> \
                </div> \
                <div class="plItem"> \
                    <span class="plNum">' + trackInfo.track + '.</span> \
                    <span class="plTitle">' + trackInfo.title + '</span> \
                    <span class="plLength">' + trackInfo.duration + '</span> \
                </div> \
            </li>');
        });

        startPlayer();
    }

    function startPlayer() {
        // 顯示文字
        var npAction = $('#npAction');
        var npTitle = $('#npTitle');

        // 音樂播放器控制
        var audio = $('#player').on('play', function() {
            setting.playing = true;
            npAction.text('Now Playing...');
        }).on('pause', function () {
            setting.playing = false;
            npAction.text('Paused...');
        }).on('ended', function () {
            npAction.text('Paused...');

            setting.index++;
            if (setting.index == playlist.length) {
                setting.index = 0;
                audio.pause();
                loadTrack(setting.index);
            } else {
                playTrack(setting.index);
            }
        }).get(0);

        // 前一首
        $('#btnPrev').on('click', function () {
            setting.index--;

            if (setting.index < 0) {
                setting.index = playlist.length - 1;
            }

            if (setting.playing) {
                playTrack(setting.index);
            } else {
                loadTrack(setting.index);
            }
        }),

        // 下一首
        $('#btnNext').on('click', function () {
            setting.index++;

            if (setting.index == playlist.length) {
                setting.index = 0;
            }

            if (setting.playing) {
                playTrack(setting.index);
            } else {
                loadTrack(setting.index);
            }
        }),

        // 點擊曲目選單
        $('#plList li').on('click', function () {
            var id = parseInt($(this).index());
            
            if (id != setting.index) {
                setting.index = id;
                playTrack(setting.index);
            } else if (!setting.playing) {
                audio.play();
            }
        });

        var loadTrack = function(id) {
            npTitle.text(playlist[id].track + '. ' + playlist[id].title);
            document.title = playlist[id].title;
            audio.src = './' + playlist[id].file;
        }

        var playTrack = function(id) {
            loadTrack(id);
            audio.play();
        }

        loadTrack(setting.index);
    }

    checkAudioSupport();
});