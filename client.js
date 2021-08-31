console.log('howdy');

const form = document.querySelector('.sample-form')
const loadingElement = document.querySelector('.loading');

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const input = {
        name,
        content
    };

    console.log(input);
    form.style.display = 'none';
    loadingElement.style.display = '';
});