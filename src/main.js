import { refs, simpleLightboxOptions, STORAGE_KEY } from "./constants/constants.js";
import { getPhotos } from "./js/pixabay-api.js";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import loader from "./js/components/loader.js";
import gallery from "./js/components/gallery.js";
import loadButton from "./js/components/loadButton.js";
import endWarning from "./js/components/endWarning.js";

let query = fillFormFields(refs.form);
let page = 1;

refs.form.addEventListener("input", handleFormInput);
refs.form.addEventListener("submit", handleSearch);

const simpleLightBox = new SimpleLightbox(".gallery li a", simpleLightboxOptions);


function handleFormInput(e) {
    query = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, query);
}


async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;

    page = 1;
    loadButton.hide();
    endWarning.hide();
    gallery.clear();
    loader.show();

    const { photos, isNext } = await fetchPictures();

    if (photos?.length) {
        gallery.show(photos);
        isNext && loadButton.show();

        simpleLightBox.refresh();
        localStorage.removeItem(STORAGE_KEY);

        refs.form.reset();
        page += 1;
    }

    loader.hide();
}


export async function handleLoadMore() {
    loader.show();
    loadButton.hide();
    endWarning.hide();

    const { photos, isNext } = await fetchPictures();
    if (photos?.length === 0) {
        endWarning.show();
    }
    else if (photos?.length) {
        gallery.addNewPhotos(photos);
        smoothScroll();
        isNext ? loadButton.show() : endWarning.show();
        simpleLightBox.refresh();
        page += 1;
    }

    loader.hide();
}


async function fetchPictures() {
    const data = await getPhotos(query, page);

    const { photos } = data;

    if (!photos) {
        iziToast.error({ message: "Sorry, there was an error while getting photos. Please try again!", position: "topRight" });
        return;
    }
    else if (photos.length === 0) {
        console.log("==== 0 ==> ", 0);
        iziToast.warning({ message: "Sorry, there are no images matching your search query. Please try again!", position: "topRight" });
    }

    return data;
}


function fillFormFields(form) {
    const localStorageData = localStorage.getItem(STORAGE_KEY);
    if (!localStorageData) return;

    form.elements.query.value = localStorageData;
    return localStorageData || "";
}


function smoothScroll() {
    const card = document.querySelector(".gallery-card");
    const height = card.getBoundingClientRect().height + 32;

    window.scrollBy({
        top: height * 2,
        left: 0,
        behavior: "smooth"
    });
}