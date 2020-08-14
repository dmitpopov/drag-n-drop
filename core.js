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
            elem.removeAttribute('draggable');
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
        createTaskUnit.remove();
    });

/*
drag - undrag
 */
    taskDrag.forEach((el) => dragPossible(el));
    taskDrag.forEach((el) => dragImpossible(el));

});

