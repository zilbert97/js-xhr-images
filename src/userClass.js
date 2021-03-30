/**
 * Manages the addition/removal of images in association with a user's email.
 *
 * Handles the addition and removal of randomly generated images in a user's
 * chosen images gallery. Images are linked to the user's email address.
 */
class UserImages {

    constructor() {
        this._userEmail = null;
        this._chosenImages = new Array();

        /**
         * Adds click event handlers to buttons.
         *
         * At class construction adds click event handlers to the email button
         * (to validate and link the email address) and attach (to add the
         * selected image to the gallery).
         *
         * @return {void} None.
         */
        this.init = () => {
            const emailButton = document.querySelector('.email--button');
            const attachButton = document.querySelector('.image--attach-button');

            // Calls the createValidator() closure for the validator to be
            // called on each email button click.
            const validateEmail = createValidator();
            let validationResult;

            emailButton.addEventListener('click', () => {
                // Validate the user's email address
                validationResult = validateEmail();

                // If a valid email is returned
                if (validationResult && validationResult !== 'empty') {

                    // Make attach button appear as active
                    document.querySelector('.image--attach-button').classList.remove('button-inactive');

                    // If first user email passed (none stored previously),
                    // store the new user email in the instance
                    if (!this._userEmail) this.updateUserEmail(validationResult);

                    // Else if a user email is already stored and is not the
                    // same as the email passed, AND images are in gallery
                    else if (validationResult.toUpperCase() !== this._userEmail.toUpperCase() && this._chosenImages.length > 0) {
                        const changeUser = confirm(`Your images are currently linked to ${this._userEmail} - if you pass a new email address you'll lose any saved images. Are you sure you want to continue?`);
                        // If confirmed to change user, reset the gallery
                        if (changeUser) this.resetGallery(validationResult);
                    }
                    // Else if user email is already stored but no images in gallery, change user
                    else this.updateUserEmail(validationResult);
                }
            });

            attachButton.addEventListener('click', () => {
                // On attach button click, if validation is a valid email, add
                // the image to the gallery and instance chosenImages property.
                if (this._userEmail) this.addGalleryItem();
            });
        }

        this.init();
    }

    /**
     * Add the image to the gallery and class instance chosenImages property.
     *
     * Gets the current image ID from the currentImage_id cookie, and checks
     * whether the image has already been selected.
     *
     * @return {void} None.
     */
    addGalleryItem() {
        const currentImageID = document.cookie.split('; ').find(row => row.startsWith('currentImage_id=')).split('=')[1];

        // Checks if the image is not already in the chosenImages array.
        if (!(this._chosenImages.indexOf(currentImageID) >= 0)) {
            // Get the current image URL
            const currentImageURL = document.cookie.split('; ').find(row => row.startsWith('currentImage_download_url=')).split('=')[1];

            // Add HTML to display a new image in the gallery.
            const gallery = document.querySelector('.gallery');
            const newGalleryItem = document.createElement('figure');
            newGalleryItem.classList.add('gallery--item');
            newGalleryItem.innerHTML = `
                <div class="gallery--img-wrapper">
                    <img src="${currentImageURL}" class="gallery--img fade-in" />
                </div>
                <div class="gallery--item-remove">
                    <i class="fas fa-times"></i>
                </div>`;

            // Insert into the gallery (before the final spacer element)
            gallery.insertBefore(newGalleryItem, document.querySelector('.gallery--item-spacer'));

            // Add to stored images
            this._chosenImages.push(currentImageID);

            // Add an event listener for the image's remove button, to remove it from the gallery
            const newGalleryItemRemove = newGalleryItem.querySelector('.gallery--item-remove');

            newGalleryItemRemove.addEventListener('click', (e) => {
                // Remove the gallery item's HTML
                let wrapper = e.target.parentNode.parentNode;
                wrapper.parentNode.removeChild(wrapper);

                // Remove from this._chosenImages
                const index = this._chosenImages.indexOf(currentImageID);
                this._chosenImages.splice(index, 1);
            });
        }
    }

    /**
     * Remove all images from the gallery.
     *
     * @param {string} emailAddress - The user's email address.
     * @return {void} None.
     */
    resetGallery(emailAddress) {
        // Set the new user email
        this.updateUserEmail(emailAddress);

        // Remove saved images from array
        this._chosenImages = [];

        // Empty the gallery
        let allGalleryItems = document.getElementsByClassName('gallery--item');

        // Fade the images out, then remove gallery items HTML from the gallery
        for (let i = 0; i < allGalleryItems.length; i++) {
            allGalleryItems[i].classList.toggle('fade-out');
        }
        setTimeout(() => {
            for (let i = allGalleryItems.length - 1; i >= 0; i--) {
                allGalleryItems[i].parentNode.removeChild(allGalleryItems[i]);
            }
        }, 300);
    }

    /**
     * Update the email address in the class and displayed on the front end.
     */
    updateUserEmail(emailAddress) {
        this._userEmail = emailAddress;

        const responseMessage = document.querySelector('.email--validation-copy');
        responseMessage.style.color = '#fefefe';
        responseMessage.innerHTML = `Attaching to ${emailAddress.toLowerCase()}`;
    }
}
