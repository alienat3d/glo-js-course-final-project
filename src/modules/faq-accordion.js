export const faqAccordionFunc = () => {
  const accordionWrapper = document.querySelector('.accordion');
  const titles = document.querySelectorAll('.title_block');

  accordionWrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (!tgt.matches('.title_block')) return;
    titles.forEach(title => {
      if (!title.classList.contains('msg-active')) return;
      title.classList.remove('msg-active');
    });
    setTimeout(() => tgt.classList.add('msg-active'), 1000);
  })
}
