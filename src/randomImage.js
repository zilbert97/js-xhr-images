/**
 * Gets a random image from Picsum and displays it on the front end.
 *
 * This self-invoking function performs a HTTP GET request via Axios to get
 * a random image from Picsum. The image is then displayed on the site. It
 * also adds a click event listener to the reset button which will replace
 * the image displayed with another random image.
 *
 * @returns {void} None.
 */
(function getRandomImage(currentImageObject) {

    /**
     * Returns a random image object from an array passed.
     *
     * @param {array} allImageObjects - An array of image objects.
     * @return {object}               - An image object from a random index
     *                                  position.
     */
    const getRandomImageObject = allImageObjects => {
        const randomIndex = max => Math.floor(Math.random() * max);
        return allImageObjects[randomIndex(allImageObjects.length - 1)]
    }

    axios.get(`https://picsum.photos/v2/list?limit=250`).then(
        (response) => {
            const imagePreview = document.querySelector('.image');
            const imageAuthor = document.querySelector('#meta-label--author > span');
            const imageSize = document.querySelector('#meta-label--size > span');

            /**
             * Iterates through the image object keys and assigns values to cookies.
             *
             * @param {object} imageObject - An image object containing the
             *                                      link and associated data.
             * @return {void} None.
             */
            const createImageCookies = imageObject => {
                /*
                for (let i = 0; i < Object.keys(imageObject).length; i++) {
                    const currentKey = Object.keys(imageObject)[i];
                    document.cookie = `currentImage_${currentKey}=${imageObject[currentKey]}`;
                }                */

                for (let i = 0; i < Object.keys(currentImageObject).length; i++) {
                    currentImageObject[
                      Object.keys(currentImageObject)[i]
                    ] = imageObject[
                      Object.keys(currentImageObject)[i]
                    ];
                }
            }

            /**
             * Displays an image on the front end.
             *
             * Parses all image objects and displays one on the front end along
             * with some metadata. The image displayed is a random image by calling
             * getRandomImageObject(). That image and its metadata are then stored
             * in cookies, by calling createImageCookies().
             *
             * @param {array} data - All image objects.
             * @return {void} None.
             */
            const setRandomImage = data => {
                const imageObject = getRandomImageObject(data);
                imagePreview.src = imageObject.download_url;
                imageAuthor.innerHTML = imageObject.author;
                imageSize.innerHTML = `${imageObject.width} x ${imageObject.height}`;
                createImageCookies(imageObject);
            }

            setRandomImage(response.data);

            // On reset button click gets a new image.
            document.querySelector('.image--reset-button').addEventListener(
                'click', () => {
                    imagePreview.classList.toggle('fade-in');
                    imagePreview.classList.toggle('fade-out');

                    // Set the image to hidden after fade-out, then get a new image
                    setTimeout(() => {
                        imagePreview.style.visibility = 'hidden';
                        imagePreview.classList.toggle('fade-out');
                        setRandomImage(response.data);
                    }, 300);

                    // Set the new image's visibility to visible then fade in,
                    // after the previous image has been faded out and hidden.
                    setTimeout(() => {
                        imagePreview.style.visibility = 'visible';
                        imagePreview.classList.toggle('fade-in');
                    }, 600);
                }
            );
        }
    ).catch((error) => {console.error(error)});
})(currentImageObject);
