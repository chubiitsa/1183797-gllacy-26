
const link = document.querySelector(".contacts-btn");
const popup = document.querySelector(".modal-feedback");
const overlay = document.querySelector(".modal-overlay");
const close = popup.querySelector(".modal-close-btn");
const contactName = popup.querySelector(".modal-input");
const form = popup.querySelector("form");
const email = popup.querySelector("[name=contact-email]");
const text = popup.querySelector("[name=comment-text]");
let nameValue = "";
let emailValue = "";
let isStorageSupport = true;

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("overlay-show");
  try {
    nameValue = localStorage.getItem("name");
    emailValue = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }
  if (nameValue && emailValue) {
    contactName.value = nameValue;
    email.value = emailValue;
    text.focus();
  } else {
    contactName.focus();
  }
  console.log(contactName);
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");
  popup.classList.remove("modal-error");
  contactName.blur();
});

overlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");
});

form.addEventListener("submit", function (evt) {
  if (!contactName.value || !email.value || !text.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", contactName.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      evt.preventDefault();
      popup.classList.remove("modal-show");
      overlay.classList.remove("overlay-show");
      popup.classList.remove("modal-error");
    }
  }
});

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("yandex-map", {
    center: [59.938631, 30.323055],
    zoom: 17,
    controls: []
  });

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: "ул. Большая Конюшенная 19/8, Санкт-Петербург",
    balloonContent: "Магазин мороженого Глэйси"
  }, {
    iconLayout: "default#image",
    iconImageHref: "img/pin.png",
    iconImageSize: [218, 142],
    iconImageOffset: [-40, -125]
  });

  myMap.geoObjects
    .add(myPlacemark);
}
