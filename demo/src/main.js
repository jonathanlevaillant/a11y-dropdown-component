import Dropdowns from './../../dist/a11y-dropdown-component.es.js';

document.addEventListener('DOMContentLoaded', () => {

  // initial config
  Dropdowns.init();

  // programmatically add dropdown
  let isActive = false;

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && !isActive) {
      Dropdowns.render('dropdown-trigger-2');
      isActive = true;
    } else if (window.innerWidth >= 768 && isActive) {
      Dropdowns.destroy('dropdown-trigger-2');
      isActive = false;
    }
  });
});
