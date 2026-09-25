/* ========================================
   BIRTHDAY WEBSITE — MUSIC SYSTEM
======================================== */

const MUSIC_FILE = "music/birthday-song.mp3";

let song = document.getElementById("birthdaySong");
let musicButton = document.getElementById("musicButton");
let songStatus = document.getElementById("songStatus");


/* ========================================
   PAGE 1 — START / PAUSE MUSIC
======================================== */

function toggleMusic() {

    if (!song) return;

    if (song.paused) {

        song.play()
            .then(() => {

                localStorage.setItem("musicStarted", "true");

                musicButton.innerHTML =
                    "⏸ PAUSE THE SURPRISE";

                if (songStatus) {
                    songStatus.innerHTML =
                        "♪ Now playing... just listen 👀";
                }

            })
            .catch(() => {

                if (songStatus) {
                    songStatus.innerHTML =
                        "Tap the button again to start the music 🎵";
                }

            });

    } else {

        song.pause();

        saveMusicPosition();

        musicButton.innerHTML =
            "▶ PLAY THE SONG";

        if (songStatus) {
            songStatus.innerHTML =
                "Music paused...";
        }
    }
}


/* ========================================
   SAVE CURRENT SONG POSITION
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


/* Save position periodically */

setInterval(() => {

    if (song && !song.paused) {
        saveMusicPosition();
    }

}, 1000);


/* Save when leaving the page */

window.addEventListener("beforeunload", () => {

    saveMusicPosition();

});


/* ========================================
   PAGE 1 → PAGE 2
======================================== */

function goToSecret() {

    saveMusicPosition();

    window.location.href = "secret.html";
}


/* ========================================
   PAGE 2 / PAGE 3 MUSIC
======================================== */

function resumeMusic() {

    if (!song) return;

    const savedTime =
        parseFloat(
            localStorage.getItem("musicTime")
        );

    if (!isNaN(savedTime)) {

        song.currentTime = savedTime;
    }

    song.play()
        .then(() => {

            localStorage.setItem(
                "musicStarted",
                "true"
            );

            updateMusicControls();

        })
        .catch(() => {

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
            status.innerHTML = "Music playing";
        }

    } else {

        button.innerHTML = "▶";

        if (status) {
            status.innerHTML = "Play music";
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
