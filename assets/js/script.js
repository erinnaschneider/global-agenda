let calendar = document.getElementById("calendarDiv");
let theWeekend = day => {
    return day === 6;
}

for (let day = 1; day <= 31; day++) {
    
    let date = new Date(2021, 10, day);
    let options = { weekday: "short"};
    let name = "";

    if (day <= 7) {
        let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
        name = `<div class="name">${dayName}</div>`
        console.log(date.getDay());
    }

    let weekend = theWeekend(day)

    calendar.insertAdjacentHTML("beforeend",`<div class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
};

//get modal
var modal = document.getElementById('taskBarModal');
//get open/close modal btn
var openModalBtn = document.getElementById('addTaskBtn');
var closeModalBtn = document.getElementById('exitTaskBtn');
//save task
var saveTaskBtn = document.getElementById('saveNewTaskBtn');
var taskText = document.querySelector('#modalTextArea');
var tasksBodySection = document.getElementById('taskBarBodySection');
var deleteTask = document.querySelector('#deleteBtn');

//open modal on click
openModalBtn.onclick = function(){
    modal.style.display = "block";
}

//close modal on click
closeModalBtn.onclick = function(){
    modal.style.display = "none";
}

function deleteATask(taskID){
    var taskSelected = document.querySelector("#newTaskItem[task-id='" + taskID + "']");
    taskSelected.remove();
}

var taskIdCounter = 0;
//save task description into div section and display
saveTaskBtn.onclick = function(){

    //create new task div element
    var newDivElement = document.createElement('div');
    //add class to div
    newDivElement.classList = "newTask";
    //add unique task id
    newDivElement.setAttribute("task-id", taskIdCounter);
    newDivElement.setAttribute("id", 'newTaskItem');

    //create new p element
    var newPElement = document.createElement('p');
    newPElement = taskText.value;
   
    //create new delete button
    var newDeleteBtn = document.createElement('button');
    //add id too delete button
    newDeleteBtn.setAttribute('id','deleteBtn');
    newDeleteBtn.setAttribute("task-id", taskIdCounter);
    newDeleteBtn.innerHTML = "Delete";
    //add icon

    //create new complete button
    var newCompleteBtn = document.createElement('button');
    //add id to complete button
    newCompleteBtn.setAttribute('id','completeBtn');
    newCompleteBtn.setAttribute("task-id", taskIdCounter);
    newCompleteBtn.innerHTML = "Complete";
    //add icon

    // add p element child too div
    newDivElement.append(newPElement);
    newDivElement.append(newDeleteBtn);
    newDivElement.append(newCompleteBtn);

    tasksBodySection.append(newDivElement);

    //close modal window
    modal.style.display = "none";
    //clear textarea
    taskText.value = "";

    //increate task counter for next unique id
    taskIdCounter ++;
}
