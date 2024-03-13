let currentItem;
const message = document.querySelector('.alert');
const items = document.querySelectorAll('li');
items.forEach((item) => {
    item.addEventListener('dragstart', (event) => {
        currentItem = event.currentTarget;
    });

    item.addEventListener('dragenter', (event) => {
        event.currentTarget.style.border = '3px dotted gray';
    });
    item.addEventListener('dragleave', (event) => {
        event.currentTarget.style.border = '';
    });
    item.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    item.addEventListener('drop', (event) => {
        event.currentTarget.style.border = '';
        [currentItem.textContent, event.currentTarget.textContent] = [event.currentTarget.textContent, currentItem.textContent];

    });
});

document.getElementById('validate').addEventListener('click', () => {
    for (let i = 0; i < items.length - 1; i++) {
        if (items[i].textContent > items[i + 1].textContent) {
            message.textContent = 'pas ok';
            return;
        }
    }
    message.textContent = 'ok';
});
