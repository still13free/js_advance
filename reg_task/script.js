const greatButton = document.querySelector('#make-great')
greatButton.addEventListener('click', () => {
    const text = document.querySelector('.text');
    const regexp = /\B'|'\B/gm;
    text.innerHTML = text.innerHTML.replace(regexp, `"`);
});
