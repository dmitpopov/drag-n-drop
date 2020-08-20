'use strict';

/*
draggable element
 */

const taskDrag = document.querySelectorAll('.task-wrap__drag-point');


function dragPossible (e) {
    e.addEventListener('mouseover', () => {
        const taskBlock = document.querySelectorAll('.task-unit-drag');
        taskBlock.forEach((elem) => {
            elem.draggable = true;
        });
    })
}

function dragImpossible (e) {
    e.addEventListener('mouseout', () => {
        const taskBlock = document.querySelectorAll('.task-unit-drag');
        taskBlock.forEach((elem) => {
            elem.draggable = false;
        });
    })
}

taskDrag.forEach((el) => dragPossible(el));
taskDrag.forEach((el) => dragImpossible(el));



/*
add task
 */

const taskCreate = document.querySelector('.task-board__add-task-button');
const task = document.querySelector('.task-unit');
const taskWrap = document.querySelector('.task-board__task-wrap');


taskCreate.addEventListener('click', () => {
    const createTaskUnit = document.createElement('div');
    createTaskUnit.classList.add('task-unit');
    createTaskUnit.classList.add('task-unit-drag');
    createTaskUnit.innerHTML = task.innerHTML;
    taskWrap.append(createTaskUnit);
    const taskDrag = document.querySelectorAll('.task-wrap__drag-point');

/*
Task delete
 */
    createTaskUnit.lastElementChild.addEventListener('click', () => {
        const taskDeleteAll = document.querySelectorAll('.task-unit');
        if (taskDeleteAll.length === 1) {
            createTaskUnit.querySelector('.task-wrap__task').value = '';
        } else {
            createTaskUnit.remove();
        }
        // createTaskUnit.remove();
    });

/*
drag - undrag
 */
    taskDrag.forEach((el) => dragPossible(el));
    taskDrag.forEach((el) => dragImpossible(el));

});

/*
dragging move
 */

const movingTask = document.querySelector('.task-board__task-wrap');

movingTask.addEventListener('dragstart', (event) => {
    event.target.classList.add('dragged');
});

movingTask.addEventListener('dragend', (event) => {
   event.target.classList.remove('dragged');
});

movingTask.addEventListener('dragover', (event) => {
    event.preventDefault();

    const dragged = movingTask.querySelector('.dragged')
    const active = event.target;
    const taskToMove = dragged !== active && active.classList.contains('task-unit');

    if(!taskToMove) {
        return;
    }

    const neighbourTask = (active === dragged.nextElementSibling) ? active.nextElementSibling : active;
    movingTask.insertBefore(dragged, neighbourTask);
});

/*
sortUp function
 */

function sortUp () {
    const unsortedTasks = document.querySelector('.task-board__task-wrap');
    const tasks = unsortedTasks.children;

    const taskItems = [];
    for(let i = 0; i < tasks.length; i++) {
        taskItems.push(tasks[i]);
    }

    taskItems.sort((a, b) => {
        const firstValue = a.querySelector('.task-wrap__task').value;
        const secondValue = b.querySelector('.task-wrap__task').value;

        if (firstValue < secondValue) {
            return -1;
        }
        if (firstValue > secondValue) {
            return 1;
        } return 0;
    })
    unsortedTasks.innerHTML = '';
    for (let k = 0; k< taskItems.length; k++) {
        unsortedTasks.append(taskItems[k]);
    }
}

function sortDown () {
    const unsortedTasks = document.querySelector('.task-board__task-wrap');
    const tasks = unsortedTasks.children;

    const taskItems = [];
    for(let i = 0; i < tasks.length; i++) {
        taskItems.push(tasks[i]);
    }

    taskItems.sort((a, b) => {
        const firstValue = a.querySelector('.task-wrap__task').value;
        const secondValue = b.querySelector('.task-wrap__task').value;

        if (firstValue > secondValue) {
            return -1;
        }
        if (firstValue < secondValue) {
            return 1;
        } return 0;
    })
    unsortedTasks.innerHTML = '';
    for (let k = 0; k< taskItems.length; k++) {
        unsortedTasks.append(taskItems[k]);
    }
}

const sortButtonUp = document.querySelector('.sort-up');
const sortButtonDown = document.querySelector('.sort-down');

sortButtonUp.addEventListener('click', () => {
    sortButtonUp.classList.add('unsorted');
    sortButtonDown.classList.remove('unsorted');
    sortUp();
})

sortButtonDown.addEventListener('click', () => {
    sortButtonUp.classList.remove('unsorted');
    sortButtonDown.classList.add('unsorted');
    sortDown();
})

const taskDeleteAll = document.querySelectorAll('.task-unit');
taskDeleteAll.forEach((el) => {
   if (taskDeleteAll.length === 1) {
       el.querySelector('.task-wrap__task-delete').addEventListener('click', () => {
           el.querySelector('.task-wrap__task').value = '';
       })
   } else {
       el.remove();
   }
});

document.querySelector('.task-first').querySelector('.task-wrap__task-delete').addEventListener('click', () => {
    const taskDeleteAll = document.querySelectorAll('.task-unit');
    if (taskDeleteAll.length === 1) {
        document.querySelector('.task-first').querySelector('.task-wrap__task').value = '';
    } else {
        document.querySelector('.task-first').remove();
    }
});


// console.log(taskItems[0].querySelector('.task-wrap__task').value);