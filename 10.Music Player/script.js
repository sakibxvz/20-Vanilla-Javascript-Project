const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const startTime = document.getElementById('time-start');
const startEnd = document.getElementById('time-end');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

//keep track of song
let songIndex = 2;

//Initially load song detais into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}
//Play Song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}

//Pause Song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	audio.pause();
}
//Previous song
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//Next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//Update progress bar
function updateProgress(e) {
	e.preventDefault();
	const { duration, currentTime } = e.srcElement;
	let progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;

	function fmtMSS(s) {
		return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.floor(s);
    }
	startTime.innerText = `${fmtMSS(currentTime)}`;
	startEnd.innerText = `${duration ? fmtMSS(duration):`0.00`}`;
}

//set progress
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;
}

//Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

//Chnage song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

//Song End
audio.addEventListener('ended', nextSong);
