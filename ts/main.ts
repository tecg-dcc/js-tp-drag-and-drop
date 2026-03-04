import {settings} from "./settings";

const app = {
    addDragEvents() {
        for (const liElement of this.liElements) {
            liElement.addEventListener('dragstart', (evt: DragEvent) => {
                this.dragStart(evt);
            });
            liElement.addEventListener('dragover', (evt: DragEvent) => {
                evt.preventDefault();
            });
            liElement.addEventListener('dragenter', (evt: DragEvent) => {
                this.dragEnter(evt);
            });
            liElement.addEventListener('dragleave', (evt: DragEvent) => {
                this.dragLeave(evt);
            });
            liElement.addEventListener('drop', (evt: DragEvent) => {
                this.drop(evt);
            });
        }
    }, init() {
        this.liElements = document.querySelectorAll(settings.liSelector);
        this.formElement = document.querySelector(settings.formSelector);
        this.alertElement = document.querySelector(settings.alertSelector)
        this.liElementToMove = null;
        this.addDragEvents();
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let isOrdered = true;
            for (let i = 0; i < this.liElements.length - 1; i++) {
                if (parseInt(this.liElements[i].textContent) > parseInt(this.liElements[i + 1].textContent)) {
                    isOrdered = false;
                    break;
                }
            }

            if (isOrdered) {
                this.alertElement.textContent = 'C’est bon :)';
            } else {
                this.alertElement.textContent = 'Ce n’est pas bon :(';
            }
        });
    },
    drop(evt: DragEvent) {
        this.dragLeave(evt);
        [(evt.currentTarget as HTMLLIElement).textContent, this.liElementToMove.textContent] =
            [this.liElementToMove.textContent, (evt.currentTarget as HTMLLIElement).textContent]
    },
    dragLeave(evt: DragEvent) {
        (evt.currentTarget as HTMLLIElement).classList.remove(settings.dragStartClass);

    },
    dragEnter(evt: DragEvent) {
        (evt.currentTarget as HTMLLIElement).classList.add(settings.dragStartClass);
    },
    dragStart(evt: DragEvent) {
        this.liElementToMove = evt.currentTarget;
    },
}

app.init();