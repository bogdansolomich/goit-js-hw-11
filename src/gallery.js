import Notiflix from 'notiflix';

const apiKey = '40313273-9433ac10f667717a01a17bc3b';
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let searchQuery = '';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchQuery = e.target.searchQuery.value;
    await performSearch();
});
loadMoreBtn.addEventListener('click', async () => {
    page++;
    await performSearch();
});

async function performSearch() {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    const data = await response.json();
    
    if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        data.hits.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('photo-card');
            card.innerHTML = `
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                    <p class="info-item"><b>Views:</b> ${image.views}</p>
                    <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
                </div>
            `;
            gallery.appendChild(card);
        });

        if (page === 1) {
            loadMoreBtn.style.display = 'block';
        }

        if (page * 40 >= data.totalHits) {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
    }
}