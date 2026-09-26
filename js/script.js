const song = document.getElementById("birthdaySong");


/* ========================================
   PAGE 1 — MUSIC
======================================== */

function toggleMusic() {

    if (!song) {
        console.error("Audio element not found!");
        return;
    }

    const musicButton =
        document.getElementById("musicButton");

    const songStatus =
        document.getElementById("songStatus");


    if (song.paused) {

        song.play()
            .then(function () {

                if (musicButton) {
                    musicButton.textContent =
                        "⏸ PAUSE THE SURPRISE";
                }

                if (songStatus) {
                    songStatus.textContent =
                        "♪ Now playing... just listen 👀";
                }

            })
            .catch(function (error) {

                console.error(
                    "Music error:",
                    error
                );

                if (songStatus) {
                    songStatus.textContent =
                        "Music couldn't start. Check the MP3.";
                }

            });

    } else {

        song.pause();

        if (musicButton) {
            musicButton.textContent =
                "▶ PLAY THE SONG";
        }

        if (songStatus) {
            songStatus.textContent =
                "Music paused...";
        }

    }
}


/* ========================================
   PAGE 1 → PAGE 2
======================================== */

function goToSecret() {

    window.location.href = "secret.html";

}


/* ========================================
   PAGE 2 → PAGE 3
======================================== */

function goToMemories() {

    window.location.href = "memories.html";

}


/* ========================================
   FLOATING MUSIC BUTTON
======================================== */

function toggleFloatingMusic() {

    if (!song) return;


    if (song.paused) {

        song.play()
            .then(function () {

                updateFloatingButton();

            })
            .catch(function (error) {

                console.error(
                    "Music error:",
                    error
                );

            });

    } else {

        song.pause();

        updateFloatingButton();

    }

}


/* ========================================
   FLOATING BUTTON
======================================== */

function updateFloatingButton() {

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

        button.textContent = "⏸";

        if (status) {
            status.textContent =
                "Music playing";
        }

    } else {

        button.textContent = "▶";

        if (status) {
            status.textContent =
                "Continue the music 🎵";
        }

    }

}
