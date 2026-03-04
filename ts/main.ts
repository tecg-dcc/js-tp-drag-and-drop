import {settings} from "./settings";

const app = {
    addDragStartEvent(evt: DragEvent) {
        this.liElementToMove = evt.currentTarget;
    },
    addDragOverEvent(evt: DragEvent) {
        evt.preventDefault();
    },
    addDragEnterEvent(evt: DragEvent) {
        (evt.currentTarget as HTMLLIElement).classList.add(settings.liDragEnterClass)
    },
    addDragLeaveEvent(evt: DragEvent) {
        (evt.currentTarget as HTMLLIElement).classList.remove(settings.liDragEnterClass)
    }, addDropEvent(evt: DragEvent) {
        this.addDragLeaveEvent(evt);

        [(evt.currentTarget as HTMLLIElement).textContent, this.liElementToMove.textContent] =
            [this.liElementToMove.textContent, (evt.currentTarget as HTMLLIElement).textContent]

    },
    addEventListeners() {
        // @ts-ignore
        for (const cardElement of this.cardElements) {
            cardElement.addEventListener('dragstart', (evt: DragEvent) => {
                this.addDragStartEvent(evt);
            });
            cardElement.addEventListener('dragover', (evt: DragEvent) => {
                this.addDragOverEvent(evt);
            });
            cardElement.addEventListener('dragenter', (evt: DragEvent) => {
                this.addDragEnterEvent(evt);
            });
            cardElement.addEventListener('dragleave', (evt: DragEvent) => {
                this.addDragLeaveEvent(evt);
            });
            cardElement.addEventListener('drop', (evt: DragEvent) => {
                this.addDropEvent(evt);
            });
        }
    },
    init() {
        this.cardElements = document.querySelectorAll(settings.liSelector);
        this.liElementToMove = null;
        this.addEventListeners();
    },
}

app.init();