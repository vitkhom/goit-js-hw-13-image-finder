import gallery from './services/apiService';
import imageTemplate from '../templates/imageTemplate.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  loadMore: document.querySelector('#load_more__button'),
};

const debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(searchForm, 500));
refs.loadMore.addEventListener('click', loadMoreHandler);

function searchForm(e) {
  e.preventDefault();

  const inputValue = e.target.value;

  clearGalleryList();

  gallery.resetPage();
  gallery.searchQuery = inputValue;
  gallery.fetchImages().then(insertGalleryItems);
}

function insertGalleryItems(items) {
  const markup = imageTemplate(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMoreHandler() {
  gallery.fetchImages().then(insertGalleryItems).then(windowScrollDown);
}

function clearGalleryList() {
  refs.gallery.innerHTML = '';
}

function windowScrollDown() {
  window.scrollTo({
    top: window.scrollY + window.innerHeight,
    behavior: 'smooth',
  });
}
