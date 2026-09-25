const song = document.getElementById("birthdaySong");
const musicButton = document.getElementById("musicButton");
const songStatus = document.getElementById("songStatus");

function toggleMusic() {

    if (song.paused) {

        song.play()
            .then(function () {

                musicButton.textContent =
                    "⏸ PAUSE THE SURPRISE";

                songStatus.textContent =
                    "♪ Now playing... just listen 👀";

            })
            .catch(function (error) {

                console.error(error);

                songStatus.textContent =
                    "Music couldn't start. Check the MP3 file.";

            });

    } else {

        song.pause();

        musicButton.textContent =
            "▶ PLAY THE SONG";

        songStatus.textContent =
            "Music paused...";
    }
}


function goToSecret() {

    window.location.href = "secret.html";

}
