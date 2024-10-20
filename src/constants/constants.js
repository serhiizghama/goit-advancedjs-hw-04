export const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.query-form'),
  loader: document.querySelector('.loader'),
  loadBtn: document.querySelector('.load-btn'),
  endWarningText: document.querySelector('.end-warning'),
};

export const PX_API_KEY = '46619732-3197f14e6c8435a9c5454ac04';

export const STORAGE_KEY = 'query';

export const simpleLightboxOptions = {
  overlay: true,
  overlayOpacity: 1,
  captions: true,
  captionPosition: 'bottom',
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
};