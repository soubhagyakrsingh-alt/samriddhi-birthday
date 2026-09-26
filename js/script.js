const song = document.getElementById("birthdaySong");


/* ========================================
   SAVE MUSIC POSITION
======================================== */

function saveMusicPosition() {

    if (!song) return;

    localStorage.setItem(
        "musicTime",
        song.currentTime
    );

}


/* Save position every second */

setInterval(function () {

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

                localStorage.setItem(
                    "musicStarted",
                    "true"
                );

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

        saveMusicPosition();

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

    saveMusicPosition();

    window.location.href =
        "secret.html";

}


/* ========================================
   PAGE 2 → PAGE 3
======================================== */

function goToMemories() {

    saveMusicPosition();

    window.location.href =
        "memories.html";

}


/* ========================================
   RESUME MUSIC
======================================== */

function resumeMusic() {

    if (!song) return;


    const savedTime =
        parseFloat(
            localStorage.getItem("musicTime")
        );


    if (!isNaN(savedTime)) {

        song.currentTime =
            savedTime;

    }


    song.play()
        .then(function () {

            updateFloatingButton();

        })
        .catch(function (error) {

            /*
             Chrome may block automatic
             playback after navigation.
             The floating button will still
             allow the user to continue.
            */

            console.log(
                "Automatic resume blocked:",
                error
            );

            updateFloatingButton();

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

        updateFloatingButton();

    }

}


/* ========================================
   FLOATING BUTTON UI
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

        button.textContent =
            "⏸";

        if (status) {
            status.textContent =
                "Music playing";
        }

    } else {

        button.textContent =
            "▶";

        if (status) {
            status.textContent =
                "Continue the music 🎵";
        }

    }

}


/* ========================================
   PAGE 2 / PAGE 3
   AUTOMATIC RESUME ATTEMPT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Page 1 has musicButton.
         * Page 2 and Page 3 don't.
         */

        const page1Button =
            document.getElementById(
                "musicButton"
            );


        const musicStarted =
            localStorage.getItem(
                "musicStarted"
            );


        if (
            !page1Button &&
            musicStarted === "true"
        ) {

            setTimeout(
                function () {

                    resumeMusic();

                },
                300
            );

        }

    }
);
