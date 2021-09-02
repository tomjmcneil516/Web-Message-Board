console.log('howdy');

const form = document.querySelector('.sample-form')
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:8000/message';


loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const message = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';


    fetch(API_URL, {
        method: 'POST',
        body:  JSON.stringify(message),
        headers: {
            'content-type' : 'application/json'
        }
    });
});