const song = document.getElementById("birthdaySong");
const musicButton = document.getElementById("musicButton");
const songStatus = document.getElementById("songStatus");

let musicPlaying = false;


function toggleMusic() {

    if (!musicPlaying) {

        song.play()
            .then(() => {

                musicPlaying = true;

                musicButton.innerHTML =
                    "⏸ PAUSE THE SURPRISE";

                songStatus.innerHTML =
                    "♪ Now playing... just listen 👀";

            })
            .catch(() => {

                songStatus.innerHTML =
                    "Add the song inside the music folder first 🎵";

            });

    } else {

        song.pause();

        musicPlaying = false;

        musicButton.innerHTML =
            "▶ PLAY THE SONG";

        songStatus.innerHTML =
            "Music paused...";

    }
}


function goToSecret() {

    window.location.href = "secret.html";

}
