/* =========================================================
   NATIONAL METAL CASTINGS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   INTRO
========================================================= */

const intro = document.querySelector("#intro");
const site = document.querySelector("#site");

document.body.classList.add("intro-active");


setTimeout(() => {

    if (site) {
        site.classList.add("visible");
    }

    if (intro) {
        intro.classList.add("finished");
    }

    setTimeout(() => {
        document.body.classList.remove("intro-active");
    }, 900);

}, 2600);



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.querySelector("#menuToggle");

const navLinks =
    document.querySelector("#navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}



/* =========================================================
   PRODUCT CAROUSEL
========================================================= */

const productsTrack =
    document.querySelector("#productsTrack");

const productPrev =
    document.querySelector(".product-prev");

const productNext =
    document.querySelector(".product-next");


if (
    productsTrack &&
    productPrev &&
    productNext
) {


    /* -----------------------------------------------------
       GET CARD SCROLL DISTANCE
    ----------------------------------------------------- */

    function getScrollAmount() {

        const card =
            productsTrack.querySelector(
                ".product-card"
            );

        if (!card) {
            return 0;
        }

        const styles =
            window.getComputedStyle(
                productsTrack
            );

        const gap =
            parseFloat(styles.columnGap) ||
            parseFloat(styles.gap) ||
            0;

        return card.offsetWidth + gap;

    }



    /* -----------------------------------------------------
       NEXT
    ----------------------------------------------------- */

    productNext.addEventListener(
        "click",
        () => {

            productsTrack.scrollBy({

                left:
                    getScrollAmount(),

                behavior:
                    "smooth"

            });

        }
    );



    /* -----------------------------------------------------
       PREVIOUS
    ----------------------------------------------------- */

    productPrev.addEventListener(
        "click",
        () => {

            productsTrack.scrollBy({

                left:
                    -getScrollAmount(),

                behavior:
                    "smooth"

            });

        }
    );



    /* -----------------------------------------------------
       MOUSE DRAG
    ----------------------------------------------------- */

    let isDragging = false;

    let startX = 0;

    let startScroll = 0;


    productsTrack.addEventListener(
        "mousedown",
        (event) => {

            isDragging = true;

            startX =
                event.pageX;

            startScroll =
                productsTrack.scrollLeft;

            productsTrack.style.scrollBehavior =
                "auto";

        }
    );


    productsTrack.addEventListener(
        "mousemove",
        (event) => {

            if (!isDragging) {
                return;
            }

            event.preventDefault();

            const distance =
                event.pageX - startX;

            productsTrack.scrollLeft =
                startScroll - distance;

        }
    );


    function stopDragging() {

        isDragging = false;

        productsTrack.style.scrollBehavior =
            "smooth";

    }


    productsTrack.addEventListener(
        "mouseup",
        stopDragging
    );


    productsTrack.addEventListener(
        "mouseleave",
        stopDragging
    );


    /* -----------------------------------------------------
       PREVENT IMAGE DRAGGING
    ----------------------------------------------------- */

    productsTrack
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "dragstart",
                (event) => {

                    event.preventDefault();

                }
            );

        });

}



/* =========================================================
   REVEAL SECTIONS
========================================================= */

const revealItems =
    document.querySelectorAll(
        ".about-grid, " +
        ".products-header, " +
        ".product-card, " +
        ".capabilities-intro, " +
        ".capability, " +
        ".quality-copy, " +
        ".contact-inner"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(
        (item) => {

            item.classList.add(
                "reveal-item"
            );

            observer.observe(item);

        }
    );

}