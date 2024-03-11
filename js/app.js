let currentItem = null;
const items = document.querySelectorAll('li');
const message = document.querySelector('.alert');
items.forEach((item) => {
    item.addEventListener('dragstart', (event) => {
        currentItem = event.currentTarget;
    });
    item.addEventListener('dragenter', (event) => {
        event.currentTarget.style.border = '2px dotted gray';
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
            message.textContent = 'Non ce n’est pas bon...';
            return;
        }
    }
    message.textContent = 'Oui, c’est bon';
});