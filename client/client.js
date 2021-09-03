

const form = document.querySelector('.sample-form')
const loadingElement = document.querySelector('.loading');
const messagesList = document.querySelector('.messages');
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
    }).then(response => response.json())
    .then(message => {console.log(message);
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';
        listMessages();
    });
});

listMessages();

function listMessages(){
    messagesList.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(messages => {
            messages.reverse().forEach(message => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = message.name;

                const contents = document.createElement('p');
                contents.textContent = message.content;
                
                const date = document.createElement('small');
                date.textContent = message.date;
                
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);
                messagesList.appendChild(div);
            });
        });
}