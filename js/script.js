```javascript
/* =========================================
   SAMRIDDHI BIRTHDAY WEBSITE
   SINGLE-PAGE / CONTINUOUS MUSIC SYSTEM
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const song =
    document.getElementById("birthdaySong");

const musicButton =
    document.getElementById("musicButton");

const songStatus =
    document.getElementById("songStatus");

const floatingMusicButton =
    document.getElementById(
        "floatingMusicButton"
    );

const floatingMusicStatus =
    document.getElementById(
        "floatingMusicStatus"
    );


/* =========================================
   PAGE ELEMENTS
========================================= */

const page1 =
    document.getElementById("page1");

const page2 =
    document.getElementById("page2");

const page3 =
    document.getElementById("page3");


/* =========================================
   START MUSIC
========================================= */

function startMusic() {

    if (!song) {

        console.error(
            "birthdaySong audio element not found."
        );

        return;

    }


    song.play()
        .then(() => {

            updateMusicUI();

        })
        .catch((error) => {

            console.error(
                "Music could not start:",
                error
            );


            if (songStatus) {

                songStatus.textContent =
                    "Tap play again to start the music.";

            }

        });

}


/* =========================================
   PLAY / PAUSE MUSIC
========================================= */

function toggleMusic() {

    if (!song) return;


    if (song.paused) {

        startMusic();

    } else {

        song.pause();

        updateMusicUI();

    }

}


/* =========================================
   UPDATE ALL MUSIC BUTTONS
========================================= */

function updateMusicUI() {

    const playing =
        song && !song.paused;


    /* Page 1 button */

    if (musicButton) {

        musicButton.textContent =
            playing
                ? "⏸ PAUSE THE SURPRISE"
                : "▶ PLAY THE SONG";

    }


    /* Page 1 status */

    if (songStatus) {

        songStatus.textContent =
            playing
                ? "♪ Now playing... just listen 👀"
                : "Music is waiting for you...";

    }


    /* Floating button */

    if (floatingMusicButton) {

        floatingMusicButton.textContent =
            playing
                ? "⏸"
                : "▶";

    }


    /* Floating status */

    if (floatingMusicStatus) {

        floatingMusicStatus.textContent =
            playing
                ? "Music playing 🎵"
                : "Play the music 🎵";

    }

}


/* =========================================
   CHANGE BETWEEN THE 3 SCREENS
========================================= */

function showPage(pageNumber) {

    /* Hide everything */

    page1.classList.remove(
        "page-active"
    );

    page2.classList.remove(
        "page-active"
    );

    page3.classList.remove(
        "page-active"
    );


    /* Show requested page */

    if (pageNumber === 1) {

        page1.classList.add(
            "page-active"
        );

    }


    if (pageNumber === 2) {

        page2.classList.add(
            "page-active"
        );

    }


    if (pageNumber === 3) {

        page3.classList.add(
            "page-active"
        );

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Keep music playing */

    updateMusicUI();

}


/* =========================================
   FLOATING MUSIC BUTTON
========================================= */

function toggleFloatingMusic() {

    toggleMusic();

}


/* =========================================
   KEEP MUSIC PLAYING
========================================= */

if (song) {

    song.addEventListener(
        "play",
        updateMusicUI
    );


    song.addEventListener(
        "pause",
        updateMusicUI
    );


    song.addEventListener(
        "ended",
        updateMusicUI
    );

}


/* =========================================
   KEYBOARD NAVIGATION
   Optional
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            showPage(1);

        }

    }
);


/* =========================================
   INITIAL STATE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showPage(1);

        updateMusicUI();

    }
);
```
