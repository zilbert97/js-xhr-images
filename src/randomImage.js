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
(function getRandomImage(user) {

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
            const imageAuthor = document.querySelector('#meta-label--author > span');
            const imageSize = document.querySelector('#meta-label--size > span');
            const imageSource = document.querySelector('#meta-label--link > a');

            /**
             * Iterates through the image object keys and stores values.
             *
             * @param {object} imageObject - An image object containing the
             *                               link and associated data.
             * @return {void} None.
             */
            const storeCurrentImage = imageObject => {
                for (let i = 0; i < Object.keys(user.currentImageObject).length; i++) {
                    user.currentImageObject[
                      Object.keys(user.currentImageObject)[i]
                    ] = imageObject[
                      Object.keys(user.currentImageObject)[i]
                    ];
                }
            }

            /**
             * Displays an image on the front end.
             *
             * Parses all image objects and displays one on the front end along
             * with some metadata. The image displayed is a random image by calling
             * getRandomImageObject(). That image and its metadata are then set
             * in the user instance passed.
             *
             * @param {array} data - All image objects.
             * @return {string} - The URL for the image loaded.
             */
            const setRandomImage = data => {
                const imageObject = getRandomImageObject(data);
                imageAuthor.innerHTML = imageObject.author;
                imageSize.innerHTML = `${imageObject.width} x ${imageObject.height}`;
                imageSource.href = imageObject.url;
                storeCurrentImage(imageObject);

                return imageObject.download_url;
            }

            document.querySelector('.image').src = setRandomImage(response.data);

            // On reset button click gets a new image.
            document.querySelector('.image--reset-button').addEventListener(
                'click', () => {
                    let previousImage = document.querySelector('.image');

                    previousImage.classList.toggle('fade-in');
                    previousImage.classList.toggle('fade-out');

                    // Set the image to hidden after fade-out, then get a new image
                    setTimeout(() => {
                        previousImage.style.visibility = 'hidden';
                        previousImage.classList.toggle('fade-out');

                        // Create a new image element
                        const newImage = new Image();
                        // Set it to hidden (before included in the DOM)
                        newImage.style.visibility = 'hidden';
                        newImage.classList.add('image');
                        // Set the src attribute to a random image URL
                        newImage.src = setRandomImage(response.data);

                        setTimeout(() => {
                            // Replace the image in the DOM with the new image
                            previousImage.parentNode.replaceChild(newImage, previousImage);
                            // Set the new image's visibility and fade-in
                            newImage.style.visibility = 'visible';
                            newImage.classList.toggle('fade-in');
                        }, 300);
                    }, 300);
                }
            );
        }
    ).catch((error) => {console.error(error)});
})(newUser);
