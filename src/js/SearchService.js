import { Notify } from 'notiflix/build/notiflix-notify-aio';
export { SearchService, Notify };
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40243094-9cac1343afd7c4b92bc3dbcfd';

async function SearchService(currentPage, searchQuery) {
  const parameters = new URLSearchParams({
    key: API_KEY,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: `true`,
    per_page: '40',
    q: searchQuery,
    page: currentPage,
  });

  try {
    const resp = await axios.get(`${BASE_URL}?${parameters}`);
    if (resp.status !== 200) {
      throw new Error(`HTTP Error! Status: ${resp.status}`);
    }
    return resp.data;
  } catch (error) {
    Notify.failure(
      `Unfortunately, there are no images matching your request. Please try again.`
    );
    throw error;
  }
}

// Підключіть ваші функції та об'єкти

window.addEventListener('scroll', () => {
  if (isScrolledToBottom()) {
    // Завантажте ще дані, якщо сторінка доклався до нижньої частини
    loadMoreBotton();
  }
});

function isScrolledToBottom() {
  const scrollHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const scrollTop = Math.max(
    document.documentElement.scrollTop,
    document.body.scrollTop
  );
  const clientHeight = document.documentElement.clientHeight;

  return scrollHeight - scrollTop - clientHeight < 40;
}
