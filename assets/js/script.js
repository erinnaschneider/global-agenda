// Get all dropdowns on the page that aren't hoverable.
let dropdowns = document.querySelectorAll('.dropdown:not(.is-hoverable)');
let apiKey = "425bdf6a-8b68-43b2-a67b-5c2fbbd0986d";
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();


// fetching weather based on ip address
function getWeatherData(){
  fetch(`https://api.airvisual.com/v2/nearest_city?key=${apiKey}`).then(function(data){
return data.json()
  }).then(function(res){
    var data = res.data;
//console.log(res)
  renderCurrentWeather(data.city, data.current)
  })
  
};

function renderCurrentWeather(city, weather){
  let temperature = weather.weather.tp;
  let humidity = weather.weather.hu;
  let windSpeed = weather.weather.ws;
  let icon = weather.weather.ic;
  let title = document.createElement("h2");
  //city date
  title.innerHTML = city + ", " + today.toLocaleDateString("en-US") + `<img src="https://airvisual.com/images/${icon}.png" width="4%">`;
  currentDaySelected.appendChild(title);
  

  // add temp
  let temp = document.createElement("p");
  temp.innerHTML = "Temperature: " + + Math.round(temperature * 1.8 + 32) + "\u00B0 F"
  currentDaySelected.appendChild(temp);

  //add humidity
  let humid = document.createElement("p");
  humid.innerHTML = "Humidity: " + humidity + "%";
  currentDaySelected.appendChild(humid);

  //add wind speed
  let wSpeed = document.createElement("p");
  wSpeed.innerHTML = "Wind speed: " + windSpeed + " mph";
  currentDaySelected.appendChild(wSpeed);

};


getWeatherData();

// to get the dropdown click to respond
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

var calendarArray = []; //Rylee's code ------ calendar create an array[] for days in calendar -----

let calendar = document.getElementById("calendarDiv");
let theWeekend = day => {
    return day === 6;
}

for (let day = 1; day <= 31; day++) {
  
  //Rylee's code ------ add days to calendarArray[]-----
  var calendarDay = { //add all items that will be stored to local storage for each day
    date: day,
    task: [],
    holiday: [],
    weather: [],
  };
  calendarArray.push(calendarDay); // add those to the calendar array
  //Rylee's code ------ End -----
    
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

// load task from local storage function()
function loadTaskFromStorage(){
  var calendarFromStorage = JSON.parse(localStorage.getItem('calendarDay')); //uploads local storage calendat
  if(calendarFromStorage == null){ // if it returns none
    localStorage.setItem('calendarDay', JSON.stringify(calendarArray)); //sets local storage to calendar made
  }
  else{ // if it's not empty
    calendarArray = []; //remove objects stored in calendar when calendar was made
    calendarArray.push(calendarFromStorage); //upload the array with local storage array
  }
}

loadTaskFromStorage();
  // if task from local storage isn't empty then append into calendar array

// add eventlistener to calendar div
  //get the calendar day selected
  //display the calendar day in daySelected div and update value

  //search through array until date == date:day
  // if match display all the task saved in that section
    // create divs and display in that section
  // if holiday isn't empty display holiday
  // if weather isn't empty display weather

//get modal
var modal = document.getElementById('taskBarModal');
var openModalBtn = document.getElementById('addTaskBtn');
var closeModalBtn = document.getElementById('exitTaskBtn');
var saveTaskBtn = document.getElementById('saveNewTaskBtn');
var taskText = document.querySelector('#modalTextArea');
var tasksBodySection = document.querySelector('#taskBarBodySection');
var currentDaySelected = document.querySelector('#daySelected');

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
  
    //store new task into the array for the specific date in task section
    for(i=0; i<calendarArray.length; i++){
      if(calendarArray[i].date == currentDaySelected.getAttribute('value')){
        calendarArray[i].task.push(newDivElement);
      }
    };

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
