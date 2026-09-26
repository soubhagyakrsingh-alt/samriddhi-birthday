```javascript
const song = document.getElementById("birthdaySong");


/* ========================================
   PAGE 1 MUSIC
======================================== */

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


                if (musicButton) {

                    musicButton.textContent =
                        "⏸ PAUSE THE SURPRISE";

                }


                if (songStatus) {

                    songStatus.textContent =
                        "♪ Now playing... just listen 👀";

                }

            })
            .catch((error) => {

                console.error(
                    "Audio error:",
                    error
                );


                if (songStatus) {

                    songStatus.textContent =
                        "Music couldn't start — check the song file.";

                }

            });

    }

    else {

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
   SAVE SONG POSITION
======================================== */

function saveMusicPosition() {

    if (!song) return;


    localStorage.setItem(
        "musicTime",
        song.currentTime
    );

}


/* Save position every second */

setInterval(() => {

    if (song && !song.paused) {

        saveMusicPosition();

    }

}, 1000);


/* Save before leaving */

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
        .then(() => {

            updateFloatingButton();

        })
        .catch((error) => {

            console.log(
                "Browser requires a tap to resume music.",
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

    }

    else {

        song.pause();

        saveMusicPosition();

        updateFloatingButton();

    }

}


/* ========================================
   FLOATING MUSIC UI
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

    }

    else {

        button.textContent =
            "▶";


        if (status) {

            status.textContent =
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


/* ========================================
   PAGE 2 / PAGE 3
   TRY TO RESUME AUTOMATICALLY
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const musicStarted =
            localStorage.getItem(
                "musicStarted"
            );


        /*
           Only attempt automatic resume
           on Page 2 and Page 3.
        */

        if (
            musicStarted === "true" &&
            !document.getElementById(
                "musicButton"
            )
        ) {

            setTimeout(
                resumeMusic,
                500
            );

        }

    }
);
```
