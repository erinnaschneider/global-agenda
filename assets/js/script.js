// Get all dropdowns on the page that aren't hoverable.
const dropdowns = document.querySelectorAll('.dropdown:not(.is-hoverable)');

if (dropdowns.length > 0) {
  // For each dropdown, add event handler to open on click.
  dropdowns.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      el.classList.toggle('is-active');
    });
  });

  // If user clicks outside dropdown, close it.
  document.addEventListener('click', function(e) {
    closeDropdowns();
  });
}

/*
 * Close dropdowns by removing `is-active` class.
 */
function closeDropdowns() {
  dropdowns.forEach(function(el) {
    el.classList.remove('is-active');
  });
}

// Close dropdowns if ESC pressed
document.addEventListener('keydown', function (event) {
  let e = event || window.event;
  if (e.key === 'Esc' || e.key === 'Escape') {
    closeDropdowns();
  }
});

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

//// ------------- Rylee's javascript ------------------ ///

//get modal
var modal = document.getElementById('taskBarModal');
var openModalBtn = document.getElementById('addTaskBtn');
var closeModalBtn = document.getElementById('exitTaskBtn');
var saveTaskBtn = document.getElementById('saveNewTaskBtn');
var taskText = document.querySelector('#modalTextArea');
var tasksBodySection = document.querySelector('#taskBarBodySection');


//open modal on click
openModalBtn.onclick = function(){
    modal.style.display = "block";
};

//close modal on click
closeModalBtn.onclick = function(){
    modal.style.display = "none";
};

//save task description into div section and display
var taskIdCounter = 0;
saveTaskBtn.onclick = function(){

    //create new task div element
    var newDivElement = document.createElement('div');
    newDivElement.classList = "newTask";//add class to div
    newDivElement.setAttribute("data-taskId", taskIdCounter);//add unique task id
    

    //create new p element
    var newPElement = document.createElement('p');
    newPElement.innerHTML = taskText.value;
   
    //create new delete button
    var newDeleteBtn = document.createElement('button');
    newDeleteBtn.classList = 'deleteBtn'; //add classes too delete button
    newDeleteBtn.setAttribute("data-taskId", taskIdCounter); //add id counter
    var iconTrash = document.createElement('i'); //create trash icon element
    iconTrash.classList = 'fa fa-trash'; //add class to icon element
    newDeleteBtn.append(iconTrash);

    //create new complete button
    var newCompleteBtn = document.createElement('select');
    newCompleteBtn.classList = 'selectStatus'; //add classes to complete button
    newCompleteBtn.setAttribute('name','statusChange');
    newCompleteBtn.setAttribute("data-taskId", taskIdCounter);
    
    var statusChoices = ['To Do', 'In Progess', 'Completed'];
    for(var i=0; i<statusChoices.length; i++){
        var optionsElement = document.createElement('option');
        optionsElement.textContent = statusChoices[i];
        optionsElement.setAttribute('value', statusChoices[i]);

        newCompleteBtn.appendChild(optionsElement);
    }

    //append to new div element
    newDivElement.append(newPElement);
    newDivElement.append(newDeleteBtn);
    newDivElement.append(newCompleteBtn);
    //append to task body section
    tasksBodySection.append(newDivElement);

    //close modal window
    modal.style.display = "none";
    //clear textarea 
    taskText.value = "";

    //increate task counter for next unique id
    taskIdCounter ++;

};

// add eventlistener to parent task body section incase tasks weren't created yet
var taskBodyListener = document.querySelector('#taskBarBodySection');
taskBodyListener.addEventListener("click", taskButtonHandler);

//find the data-taskid of the function that was clicked on
function taskButtonHandler (event){
    var taskId = event.target.getAttribute('data-taskId'); //get elements task id
    if(event.target.matches('.deleteBtn')){
        deleteTask(taskId);//send to delete function
    }
    if(event.target.matches('.selectStatus')){
        var optionsValue = event.target.value;
        taskStatus(taskId, optionsValue);//send to delete function
    }
};

function taskStatus(taskId, optionsValue){
    var taskSeleted = document.querySelector(".newTask[data-taskId='" + taskId + "']");
    if(optionsValue == 'To Do'){
        taskSeleted.setAttribute('style','background-color: lightgrey');
    }
    if(optionsValue == 'In Progess'){
        taskSeleted.setAttribute('style','background-color: lightyellow');
    }
    if(optionsValue == 'Completed'){
        taskSeleted.setAttribute('style','background-color: lightgreen');
    }
}

//delete task with matched id
function deleteTask(taskId){
    var taskSeleted = document.querySelector(".newTask[data-taskId='" + taskId + "']");
    taskSeleted.remove();
}
//// ------------- End of Rylee's javascript ------------------ ///
