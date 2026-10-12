/**
 * =====================================================================
 * 3D PORTFOLIO WEBSITE - CODEHAL INTERACTIVE SCRIPT
 * Controls: 3D Page Turn, Z-Index Layering, Contact Navigation & Opening
 * =====================================================================
 */

const pages = document.querySelectorAll('.book-page.page-right');
const pageTurnBtns = document.querySelectorAll('.nextprev-btn');

// Initial z-index stacking for right-side pages (front-most sheet on top)
pages.forEach((page, index) => {
  page.style.zIndex = 20 - index;
});

// Turn pages when clicking next or prev buttons
pageTurnBtns.forEach((el, index) => {
  el.onclick = (e) => {
    e.preventDefault();
    const pageTurnId = el.getAttribute('data-page');
    const pageTurn = document.getElementById(pageTurnId);
    const sheetIndex = Array.from(pages).indexOf(pageTurn);

    if (pageTurn.classList.contains('turn')) {
      pageTurn.classList.remove('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - sheetIndex;
      }, 500);
    } else {
      pageTurn.classList.add('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + sheetIndex;
      }, 500);
    }
  };
});

// Contact Me button on Profile page: Turns all pages to Contact page
const contactMeBtn = document.querySelector('#btn-contact-me');

if (contactMeBtn) {
  contactMeBtn.onclick = (e) => {
    e.preventDefault();
    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, 500);
      }, (index + 1) * 220);
    });
  };
}

// Back Profile button on Contact page: Returns smoothly to first spread (Page 1)
const backProfileBtn = document.querySelector('#back-profile-btn');

if (backProfileBtn) {
  backProfileBtn.onclick = (e) => {
    e.preventDefault();
    const total = pages.length;
    pages.forEach((_, index) => {
      const pageIndex = total - 1 - index;
      setTimeout(() => {
        pages[pageIndex].classList.remove('turn');
        setTimeout(() => {
          pages[pageIndex].style.zIndex = 20 - pageIndex;
        }, 500);
      }, (index + 1) * 220);
    });
  };
}

// Opening Animation on Page Load
const coverRight = document.querySelector('.cover.cover-right');

// Animate opening book right cover smoothly
setTimeout(() => {
  if (coverRight) {
    coverRight.classList.add('turn');
  }
}, 1800);

setTimeout(() => {
  if (coverRight) {
    coverRight.style.zIndex = -1;
  }
}, 2600);

// Opening animation for right-side pages (unfolding from right to left)
const total = pages.length;
pages.forEach((_, index) => {
  const pageIndex = total - 1 - index;
  setTimeout(() => {
    pages[pageIndex].classList.remove('turn');
    setTimeout(() => {
      pages[pageIndex].style.zIndex = 20 - pageIndex;
    }, 500);
  }, (index + 1) * 180 + 1900);
});

// Interactive Contact Form Feedback
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const msg = document.getElementById('message-text').value.trim();

    if (!name || !email || !msg) return;

    formMsg.textContent = 'Sending message...';
    formMsg.style.color = 'var(--main-color)';

    setTimeout(() => {
      formMsg.textContent = '✓ Message sent successfully! Thank you!';
      formMsg.style.color = '#10b981';
      contactForm.reset();

      setTimeout(() => {
        formMsg.textContent = '';
      }, 4000);
    }, 800);
  });
}
