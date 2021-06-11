import gallery from "./gallery-items.js";

const refs = {
  galleryWrap: document.querySelector(".gallery, js-gallery"),
  galleryItems: createGallery(gallery),

  lightbox: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
};

refs.galleryWrap.insertAdjacentHTML("beforeend", refs.galleryItems);
refs.galleryWrap.addEventListener("click", onImgClick);

window.addEventListener("keydown", closeModalUseEsc);

function createGallery(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    openModal();
  }

  assignCurrentSrcForLightboxImg(e);
}

function openModal() {
  refs.lightbox.classList.add("is-open");
  refs.lightbox.addEventListener("click", closeModalByBtnAndOverlay);
  window.addEventListener("keydown", closeModalUseEsc);
}
function closeModal() {
  refs.lightbox.classList.remove("is-open");
}

function closeModalByBtnAndOverlay(e) {
  if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
    closeModal();
    changeSrcForLightboxImg("", "");
  }
}
function closeModalUseEsc(e) {
  if (e.code === "Escape") {
    closeModal();
    changeSrcForLightboxImg("", "");
  }
}
function assignCurrentSrcForLightboxImg(e) {
  const currentImgLink = e.target.dataset.source;
  const currentImgAlt = e.target.alt;
  changeSrcForLightboxImg(currentImgLink, currentImgAlt);
}
function changeSrcForLightboxImg(src, alt) {
  refs.lightboxImg.src = src;
  refs.lightboxImg.alt = alt;
}
