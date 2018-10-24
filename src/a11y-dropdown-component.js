/* dropdowns
 ========================================================================== */

const Dropdowns = (() => {
  const DATA_COMPONENT = '[data-component="dropdown"]';

  const KEY_CODES = {
    escape: 27,
    end: 35,
    home: 36,
    up: 38,
    down: 40,
  };

  class Dropdown {
    constructor(options) {
      this.trigger = options.trigger;
      this.dropdown = document.getElementById(options.dropdown);
      this.items = this.dropdown.querySelectorAll('[data-item]');
      this.links = this.dropdown.querySelectorAll('[data-focus]');
      [this.firstLink] = this.links;
      this.lastLink = this.links[this.links.length - 1];

      this.state = [];
      this.currentFocusedIndex = 0;

      this.hover = options.hover;
      this.isOpen = options.isOpen;

      this.open = this.open.bind(this);
      this.toggle = this.toggle.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onFocus = this.onFocus.bind(this);
      this.onKeydown = this.onKeydown.bind(this);

      if (this.isOpen) this.open();
    }

    onClick(event) {
      if (!event.target.closest(`#${this.trigger.id}, #${this.dropdown.id}`)) {
        this.close();
      }
    }

    onFocus(event) {
      this.state.forEach((section, index) => {
        if (event.target === section.link) {
          this.currentFocusedIndex = index;
        }
      });
    }

    setFocus(event) {
      event.preventDefault();

      if (event.target === this.trigger) this.currentFocusedIndex = 0;

      switch (event.which) {
        case KEY_CODES.up:
          this.state[this.currentFocusedIndex].prevLink.focus();
          break;
        case KEY_CODES.home:
          this.firstLink.focus();
          break;
        case KEY_CODES.end:
          this.lastLink.focus();
          break;
        case KEY_CODES.down:
          if (event.target !== this.trigger) {
            this.state[this.currentFocusedIndex].nextLink.focus();
          } else {
            this.firstLink.focus();
          }
          break;
        default:
          break;
      }
    }

    onKeydown(event) {
      switch (event.which) {
        case KEY_CODES.escape:
          this.close(event);
          break;
        case KEY_CODES.up:
        case KEY_CODES.down:
        case KEY_CODES.home:
        case KEY_CODES.end:
          this.setFocus(event);
          break;
        default:
          break;
      }
    }

    addAttributes() {
      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-controls', this.trigger.dataset.target);
      this.dropdown.setAttribute('role', 'menu');
      this.dropdown.setAttribute('aria-labelledby', this.trigger.id);
      this.dropdown.setAttribute('tabindex', -1);
      this.dropdown.setAttribute('aria-hidden', !this.isOpen);

      this.state.forEach((section) => {
        if (section.item) section.item.setAttribute('role', 'none');

        section.link.setAttribute('role', 'menuitem');
        section.link.setAttribute('tabindex', -1);
      });
    }

    removeAttributes() {
      this.trigger.removeAttribute('aria-haspopup');
      this.trigger.removeAttribute('aria-controls');
      this.trigger.removeAttribute('aria-expanded');
      this.dropdown.removeAttribute('role');
      this.dropdown.removeAttribute('aria-labelledby');
      this.dropdown.removeAttribute('tabindex');
      this.dropdown.removeAttribute('aria-hidden');

      this.state.forEach((section) => {
        if (section.item) section.item.removeAttribute('role');

        section.link.removeAttribute('role');
        section.link.removeAttribute('tabindex');
      });
    }

    addEventListeners() {
      document.addEventListener('click', this.onClick);
      if (this.hover) document.addEventListener('mouseover', this.onClick);
      this.trigger.addEventListener('keydown', this.onKeydown);
      this.dropdown.addEventListener('keydown', this.onKeydown);
      this.links.forEach((link) => {
        link.addEventListener('focus', this.onFocus);
      });
    }

    removeEventListeners() {
      document.removeEventListener('click', this.onClick);
      if (this.hover) document.removeEventListener('mouseover', this.onClick);
      this.trigger.removeEventListener('keydown', this.onKeydown);
      this.dropdown.removeEventListener('keydown', this.onKeydown);
      this.links.forEach((link) => {
        link.removeEventListener('focus', this.onFocus);
      });
    }

    open() {
      this.isOpen = true;

      this.trigger.setAttribute('aria-expanded', true);
      this.dropdown.setAttribute('aria-hidden', false);

      // add event listeners
      this.addEventListeners();
    }

    close(event) {
      this.isOpen = false;

      this.trigger.setAttribute('aria-expanded', false);
      this.dropdown.setAttribute('aria-hidden', true);

      // remove event listeners
      this.removeEventListeners();

      // restoring focus
      if (event) this.trigger.focus();
    }

    toggle(event) {
      event.preventDefault();

      this.isOpen = !this.isOpen;

      this.isOpen ? this.open() : this.close();
    }

    destroy() {
      // remove attributes
      this.removeAttributes();

      // remove event listeners
      this.removeEventListeners();

      // remove event listener on the trigger button
      this.trigger.removeEventListener('click', this.toggle);
      if (this.hover) this.trigger.removeEventListener('mouseover', this.open);
    }

    render() {
      this.links.forEach((link, index) => {
        this.state.push({
          item: this.items[index],
          link,
          prevLink: this.links[index - 1] || this.lastLink,
          nextLink: this.links[index + 1] || this.firstLink,
        });
      });

      // add attributes
      this.addAttributes();

      // toggle dropdown
      this.trigger.addEventListener('click', this.toggle);
      if (this.hover) this.trigger.addEventListener('mouseover', this.open);
    }
  }

  // save all active dropdowns
  const activeDropdowns = [];

  const render = (triggerId, { isOpen = false, hover = false } = {}) => {
    const trigger = document.getElementById(triggerId);
    const dropdown = trigger.dataset.target;
    const options = { trigger, dropdown, isOpen, hover };

    const activeDropdown = new Dropdown(options);
    activeDropdown.render();

    // add active dropdowns to array
    activeDropdowns.push(activeDropdown);
  };

  const destroy = (triggerId) => {
    activeDropdowns.forEach((activeDropdown, index) => {
      if (triggerId === activeDropdown.trigger.id) {
        activeDropdown.destroy();

        // remove dropdown from array
        activeDropdowns.splice(index, 1);
      }
    });
  };

  const init = () => {
    const triggers = document.querySelectorAll(DATA_COMPONENT);
    const options = {};

    triggers.forEach((trigger) => {
      options.trigger = trigger;
      options.dropdown = trigger.dataset.target;

      options.hover = trigger.dataset.hover === 'true';
      options.isOpen = trigger.dataset.open === 'true';

      const dropdown = new Dropdown(options);
      dropdown.render();
    });
  };

  return { render, destroy, init };
})();

export default Dropdowns;
