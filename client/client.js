console.log('howdy');

const form = document.querySelector('.sample-form')
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5500/input';


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


    fetch(API_URL, {
        method: 'POST',
        body:  JSON.stringify(input),
        headers: {
            'content-type' : 'application/json'
        }
    });
});