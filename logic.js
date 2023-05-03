const body = document.querySelector("body");
const covers = document.querySelectorAll(".cover");
const listItems = document.querySelectorAll(".js-list-item");

let selectedItem = null;
const itemsArray = Array.from(listItems);

// reset to the top
window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});

// set the flag to true start the interval
window.addEventListener("scroll", backgroundChange);

// offsetTop: the distance between the top of the window and the top of the element
// offsetHeight: the height of the element(without the margin)

function backgroundChange() {
  let currentId = "";
  // Change 33% earlier than scroll position so colour is there when you arrive.
  let scroll = scrollY + innerHeight / 3;

  // if position is within range of this panel.
  // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
  // Remember we set the scroll to 33% earlier in scroll var.
  covers.forEach((cover) => {
    if (
      cover.offsetTop <= scroll &&
      cover.offsetTop + cover.offsetHeight > scroll
    ) {
      body.className = `bg-${cover.dataset.color}`;
      currentId = cover.id;
    }
  });
  indicateLink(currentId);
}

function indicateLink(id) {
  listItems.forEach((item) => {
    item.classList.remove("active");

    if (item.href.includes(id)) {
      item.classList.add("active");
    }
  });
}

function debounce(func, wait = 0, immediate = true) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
