
let siteHeaderItems = document.querySelectorAll('.siteHeader .siteHeader__item');
siteHeaderItems.addEventListener('click', (e) => {
    let selectedClass = 'is-site-header-item-selected';
    siteHeaderItems.removeClass(selectedClass);
    e.target.addClass(selectedClass);
})