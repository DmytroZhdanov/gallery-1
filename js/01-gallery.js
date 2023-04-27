import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const markup = galleryItems
  .map(
    image => `<li class="gallery__item">
  <a class="gallery__link" href="${image.original}">
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);
gallery.addEventListener("click", onImagePreviewClick);

function onImagePreviewClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const originalImageUrl = evt.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${originalImageUrl}">`, {
    onShow: () => {
      document.addEventListener("keydown", onKeydown);
    },
    onClose: () => {
      document.removeEventListener("keydown", onKeydown);
    },
  });

  instance.show();

  function onKeydown(keyboardEvt) {
    if (keyboardEvt.code !== "Escape") {
      return;
    }

    instance.close();
  }
}
