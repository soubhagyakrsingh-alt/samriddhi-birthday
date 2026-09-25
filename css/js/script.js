const song = document.getElementById("birthdaySong");
const musicButton = document.getElementById("musicButton");
const songStatus = document.getElementById("songStatus");

let musicPlaying = false;


/* ========================================
   PLAY / PAUSE MUSIC
======================================== */

function toggleMusic() {

    if (!song) {
        console.log("Audio element not found.");
        return;
    }

    if (song.paused) {

        song.play()
            .then(() => {

                musicPlaying = true;

                localStorage.setItem(
                    "musicStarted",
                    "true"
                );

                musicButton.innerHTML =
                    "⏸ PAUSE THE SURPRISE";

                songStatus.innerHTML =
                    "♪ Now playing... just listen 👀";

            })
            .catch((error) => {

                console.error(
                    "Music could not play:",
                    error
                );

                songStatus.innerHTML =
                    "Music couldn't start. Try pressing Play again 🎵";
            });

    } else {

        song.pause();

        saveMusicPosition();

        musicPlaying = false;

        musicButton.innerHTML =
            "▶ PLAY THE SONG";

        songStatus.innerHTML =
            "Music paused...";
    }
}


/* ========================================
   SAVE MUSIC POSITION
======================================== */

function saveMusicPosition() {

    if (!song) return;

    if (!isNaN(song.currentTime)) {

        localStorage.setItem(
            "musicTime",
            song.currentTime
        );
    }
}


/* Save position every second */

setInterval(() => {

    if (song && !song.paused) {
        saveMusicPosition();
    }

}, 1000);


/* Save before leaving page */

window.addEventListener(
    "beforeunload",
    saveMusicPosition
);


/* ========================================
   PAGE 1 → PAGE 2
======================================== */

function goToSecret() {

    saveMusicPosition();

    window.location.href =
        "secret.html";
}


/* ========================================
   PAGE 2 / PAGE 3
======================================== */

function resumeMusic() {

    if (!song) return;

    const savedTime = parseFloat(
        localStorage.getItem("musicTime")
    );

    if (!isNaN(savedTime)) {
        song.currentTime = savedTime;
    }

    song.play()
        .then(() => {

            updateMusicControls();

        })
        .catch((error) => {

            console.log(
                "Browser requires a user tap to resume music.",
                error
            );

            updateMusicControls();
        });
}


/* ========================================
   FLOATING MUSIC BUTTON
======================================== */

function toggleFloatingMusic() {

    if (!song) return;

    if (song.paused) {

        resumeMusic();

    } else {

        song.pause();

        saveMusicPosition();

        updateMusicControls();
    }
}


function updateMusicControls() {

    const button =
        document.getElementById(
            "floatingMusicButton"
        );

    const status =
        document.getElementById(
            "floatingMusicStatus"
        );

    if (!button) return;


    if (song && !song.paused) {

        button.innerHTML = "⏸";

        if (status) {
            status.innerHTML =
                "Music playing";
        }

    } else {

        button.innerHTML = "▶";

        if (status) {
            status.innerHTML =
                "Continue the music 🎵";
        }
    }
}


/* ========================================
   PAGE 2 → PAGE 3
======================================== */

function goToMemories() {

    saveMusicPosition();

    window.location.href =
        "memories.html";
}
