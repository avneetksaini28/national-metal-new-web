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

/*
   Mobile navigation uses the horizontal links directly.
   No dropdown menu required.
*/
/* =========================================================
   MOBILE NAVIGATION — ACTIVE SECTION
========================================================= */

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

if (navLinks.length && sections.length) {

    const navObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        navObserver.observe(section);
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

const revealItems = document.querySelectorAll(
    ".about-grid, " +
    ".products-header, " +
    ".capabilities-intro, " +
    ".capability, " +
    ".quality-copy, " +
    ".contact-inner"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach((item) => {

        item.classList.add("reveal-item");

        observer.observe(item);

    });
}


/* =========================================================
   MOBILE PRODUCT IMAGE PRELOAD
   Loads all product images immediately.
========================================================= */

if (window.innerWidth <= 600) {

    document.querySelectorAll(".product-card img").forEach((img) => {

        const preload = new Image();

        preload.src = img.currentSrc || img.src;

    });

}