(function getRandomImage() {
    const getRandomImageObject = allImageObjects => {
        const randomIndex = max => Math.floor(Math.random() * max);
        return allImageObjects[randomIndex(allImageObjects.length - 1)]
    }

    axios.get(
        `https://picsum.photos/v2/list?limit=250`
    ).then((response) => {
        const imagePreview = document.querySelector('.image');
        const imageAuthor = document.querySelector('#meta-label--author > span');
        const imageSize = document.querySelector('#meta-label--size > span');
        const createImageCookies = (currentImageObject) => {
            for (let i = 0; i < Object.keys(currentImageObject).length; i++) {
                const currentKey = Object.keys(currentImageObject)[i];
                document.cookie = `currentImage_${currentKey}=${currentImageObject[currentKey]}`;
            }
        }
        const setRandomImage = (data) => {
            const currentImageObject = getRandomImageObject(data);
            imagePreview.src = currentImageObject.download_url;
            imageAuthor.innerHTML = currentImageObject.author;
            imageSize.innerHTML = `${currentImageObject.width} x ${currentImageObject.height}`;
            createImageCookies(currentImageObject);
        }
        const resetButton = document.querySelector('.image--reset-button');

        setRandomImage(response.data);
        resetButton.addEventListener('click', () => {
            imagePreview.classList.toggle('fade-in');
            imagePreview.classList.toggle('fade-out');
            setTimeout(() => {
                imagePreview.style.visibility = 'hidden';
                imagePreview.classList.toggle('fade-out');
                setRandomImage(response.data);
            }, 300);
            setTimeout(() => {
                imagePreview.style.visibility = 'visible';
                imagePreview.classList.toggle('fade-in');
            }, 600);
        });
    }).catch((error) => {
        console.error(error);
    });
})();
