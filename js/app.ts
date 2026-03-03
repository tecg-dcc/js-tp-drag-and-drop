const items = document.querySelectorAll('li[draggable=true]');

let currentDraggedElement: HTMLLIElement = null;
// @ts-ignore
for (const liItem of items) {
    liItem.addEventListener('dragstart', (evt: DragEvent) => {
        currentDraggedElement = evt.currentTarget as HTMLLIElement;
    });

    liItem.addEventListener('dragover', (evt: DragEvent) => {
        evt.preventDefault();
    });

    liItem.addEventListener('dragenter', (evt: DragEvent) => {
        const li = evt.currentTarget as HTMLLIElement;
        li.style.outline = "3px dotted gray";
    });
    liItem.addEventListener('dragleave', (evt: DragEvent) => {
        (evt.currentTarget as HTMLLIElement).style.outline = "";
    });

    liItem.addEventListener('drop', (evt: DragEvent) => {
        [currentDraggedElement.textContent, (evt.currentTarget as HTMLLIElement).textContent] = [(evt.currentTarget as HTMLLIElement).textContent, currentDraggedElement.textContent];
    });
}

document.getElementById('validate').addEventListener('click', () => {
    for (let i = 0; i < items.length - 1; i++) {
        if (items[i].textContent > items[i + 1].textContent) {
            document.querySelector('.alert').textContent = "Eh non ! Ce n’est pas bon !";
            return;
        }
    }
    document.querySelector('.alert').textContent = "Cool c’est bon !";
});