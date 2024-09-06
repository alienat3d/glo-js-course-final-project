import { toggleActiveClass } from "./helpers";

export const smoothScrollToFunc = () => {
  const navMenuLinks = document.querySelectorAll('.popup-menu-nav .menu-link:not(.no-overflow)');
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const backToTopButton = document.querySelector('.footer .button-footer a');
  const anchorLinksArray = [...navMenuLinks, backToTopButton];

  const smoothScrollIntoView = (evt) => {
    const blockId = evt.target.getAttribute('href');
    document.querySelector(blockId).scrollIntoView({ behavior: "smooth" });
  }

  anchorLinksArray.forEach(link => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleActiveClass(navMenuBlock, 'showHide-menu');
      smoothScrollIntoView(evt);
    })
  });
}
