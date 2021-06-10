import gallery from "./gallery-items.js";

const refs = {
  galleryWrap: document.querySelector(".gallery, js-gallery"),
  galleryItems: createGallery(gallery),

  lightbox: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
};

refs.galleryWrap.insertAdjacentHTML("beforeend", refs.galleryItems);
refs.galleryWrap.addEventListener("click", onImgClick);
refs.lightbox.addEventListener("click", closeModal);
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
}

function closeModal(e) {
  if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
  }
}
function closeModalUseEsc(e) {
  if (e.code === "Escape") {
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
  }
}
function assignCurrentSrcForLightboxImg(e) {
  const currentImgLink = e.target.dataset.source;
  const currentImgAlt = e.target.alt;
  refs.lightboxImg.src = currentImgLink;
  refs.lightboxImg.alt = currentImgAlt;
}
