function addGalleryItem() {
    const currentImage = document.cookie.split('; ').find(row => row.startsWith('currentImage_download_url=')).split('=')[1];
    const gallery = document.querySelector('.gallery');
    const newGalleryItem = document.createElement('figure');
    newGalleryItem.classList.add('gallery--item');
    newGalleryItem.innerHTML = `
        <div class="gallery--img-wrapper">
            <img src="${currentImage}" class="gallery--img fade-in" />
        </div>
        <div class="gallery--item-remove">
            <i class="fas fa-times"></i>
        </div>`;
    gallery.insertBefore(newGalleryItem, document.querySelector('.gallery--item-spacer'));

    const newGalleryItemRemove = newGalleryItem.querySelector('.gallery--item-remove');

    newGalleryItemRemove.addEventListener('click', (e) => {
        let wrapper = e.target.parentNode.parentNode;
        wrapper.parentNode.removeChild(wrapper);
    });
}
