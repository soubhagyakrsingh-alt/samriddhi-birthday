/* =========================================
   SAMRIDDHI BIRTHDAY WEBSITE
   CONTINUOUS MUSIC SYSTEM
========================================= */

const song = document.getElementById("birthdaySong");


/* =========================================
   SAVE MUSIC POSITION
========================================= */

function saveMusicPosition() {

    if (!song) return;

    localStorage.setItem(
        "musicTime",
        song.currentTime
    );

}


/* =========================================
   PAGE 1 — PLAY / PAUSE
========================================= */

function toggleMusic() {

    if (!song) return;

    const musicButton =
        document.getElementById("musicButton");

    const songStatus =
        document.getElementById("songStatus");


    if (song.paused) {

        song.play()
            .then(() => {

                localStorage.setItem(
                    "musicStarted",
                    "true"
                );

                updatePage1Button();

            })
            .catch((error) => {

                console.error(
                    "Music error:",
                    error
                );

                if (songStatus) {

                    songStatus.textContent =
                        "Tap play again to start the music.";
                }

            });

    } else {

        song.pause();

        saveMusicPosition();

        updatePage1Button();

    }

}


/* =========================================
   PAGE 1 BUTTON
========================================= */

function updatePage1Button() {

    const musicButton =
        document.getElementById("musicButton");

    const songStatus =
        document.getElementById("songStatus");


    if (!musicButton) return;


    if (song && !song.paused) {

        musicButton.textContent =
            "⏸ PAUSE THE SURPRISE";


        if (songStatus) {

            songStatus.textContent =
                "♪ Now playing... just listen 👀";
        }

    } else {

        musicButton.textContent =
            "▶ PLAY THE SONG";


        if (songStatus) {

            songStatus.textContent =
                "Music paused...";
        }

    }

}


/* =========================================
   SAVE POSITION EVERY SECOND
========================================= */

setInterval(() => {

    if (song && !song.paused) {

        saveMusicPosition();

    }

}, 500);


/* =========================================
   SAVE BEFORE LEAVING
========================================= */

window.addEventListener(
    "beforeunload",
    saveMusicPosition
);


/* =========================================
   PAGE 1 → PAGE 2
========================================= */

function goToSecret() {

    saveMusicPosition();

    window.location.href =
        "secret.html";

}


/* =========================================
   RESUME MUSIC
========================================= */

function resumeMusic() {

    if (!song) return;


    const savedTime =
        parseFloat(
            localStorage.getItem("musicTime")
        );


    if (!isNaN(savedTime)) {

        song.addEventListener(
            "loadedmetadata",
            function () {

                if (
                    savedTime >= 0 &&
                    savedTime < song.duration
                ) {

                    song.currentTime =
                        savedTime;

                }

                attemptMusicPlayback();

            },
            { once: true }
        );

    } else {

        attemptMusicPlayback();

    }

}


/* =========================================
   TRY AUTOMATIC PLAY
========================================= */

function attemptMusicPlayback() {

    if (!song) return;


    song.play()
        .then(() => {

            localStorage.setItem(
                "musicStarted",
                "true"
            );

            updateFloatingMusic();

        })
        .catch(() => {

            /*
              Browser blocked automatic
              playback.

              The floating button remains
              available so she can tap it once.
            */

            updateFloatingMusic();

        });

}


/* =========================================
   FLOATING MUSIC BUTTON
========================================= */

function toggleFloatingMusic() {

    if (!song) return;


    if (song.paused) {

        const savedTime =
            parseFloat(
                localStorage.getItem("musicTime")
            );


        if (
            !isNaN(savedTime) &&
            savedTime < song.duration
        ) {

            song.currentTime =
                savedTime;

        }


        song.play()
            .then(() => {

                localStorage.setItem(
                    "musicStarted",
                    "true"
                );

                updateFloatingMusic();

            })
            .catch((error) => {

                console.error(
                    "Music could not start:",
                    error
                );

            });

    } else {

        song.pause();

        saveMusicPosition();

        updateFloatingMusic();

    }

}


/* =========================================
   FLOATING BUTTON UPDATE
========================================= */

function updateFloatingMusic() {

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


/* =========================================
   PAGE 2 → PAGE 3
========================================= */

function goToMemories() {

    saveMusicPosition();

    window.location.href =
        "memories.html";

}


/* =========================================
   AUTOMATIC RESUME ON PAGE 2 / 3
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
          Only attempt automatic resume if
          music was started previously.
        */

        const musicStarted =
            localStorage.getItem(
                "musicStarted"
            );


        if (
            musicStarted === "true" &&
            !document.getElementById(
                "musicButton"
            )
        ) {

            /*
              Small delay gives the browser
              time to load the audio metadata.
            */

            setTimeout(
                resumeMusic,
                300
            );

        }

    }
);
