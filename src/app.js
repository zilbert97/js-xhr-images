const buttons = document.getElementsByClassName('gallery--item-remove');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (e) => {

    let wrapper = e.target.parentNode.parentNode;
    wrapper.parentNode.removeChild(wrapper);
  });
}


//

createValidator();
