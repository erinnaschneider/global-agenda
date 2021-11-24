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

  var currentWeather = document.querySelector('#weatherSection');

  let temperature = weather.weather.tp;
  let humidity = weather.weather.hu;
  let windSpeed = weather.weather.ws;
  let icon = weather.weather.ic;
  let title = document.createElement("h2");
  //city date
  title.innerHTML = city + ", " + today.toLocaleDateString("en-US") + `<img src="https://airvisual.com/images/${icon}.png" width="4%">`;
  currentWeather.appendChild(title);
  

  // add temp
  let temp = document.createElement("p");
  temp.innerHTML = "Temperature: " + + Math.round(temperature * 1.8 + 32) + "\u00B0 F"
  currentWeather.appendChild(temp);

  //add humidity
  let humid = document.createElement("p");
  humid.innerHTML = "Humidity: " + humidity + "%";
  currentWeather.appendChild(humid);

  //add wind speed
  let wSpeed = document.createElement("p");
  wSpeed.innerHTML = "Wind speed: " + windSpeed + " mph";
  currentWeather.appendChild(wSpeed);

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
    
    calendar.insertAdjacentHTML("beforeend",`<div value=${day} class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
};

//// ------------- Rylee's javascript ------------------ ///

//get modal
var modal = document.getElementById('taskBarModal');
var openModalBtn = document.getElementById('addTaskBtn');
var closeModalBtn = document.getElementById('exitTaskBtn');
var saveTaskBtn = document.getElementById('saveNewTaskBtn');
var taskText = document.querySelector('#modalTextArea');
var taskBarHeaderSection = document.querySelector('#taskBarHeaderSection');
var tasksBodySection = document.querySelector('#taskBarBodySection');
var currentDaySelected = document.querySelector('#daySelected');
var calendarMonthTitle = document.getElementById('month');

calendarMonthTitle.innerHTML = dayjs().format('MMMM YYYY'); //set calendar month for current month
currentDaySelected.innerHTML = "Task for " + dayjs().format('MMM') + ' ' + dayjs().format('D');//set task header to current day
currentDaySelected.setAttribute('value', dayjs().format('D'));

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
  createNewTask(taskIdCounter, taskText.value, "To-Do");
  //close modal window
  modal.style.display = "none";
  //clear textarea 
  taskText.value = "";
}

//create a new task from user input
function createNewTask(ID, description, status){
    var newTask = {
      ID: ID,
      description: description,
      status: status,
    };
  
    appendTask(ID, description,status);

    //store new task into the array for the specific date in task section
    for(i=0; i<calendarArray.length; i++){

      if(calendarArray[i].date == currentDaySelected.getAttribute('value')){
        calendarArray[i].task.push(newTask);
      }
    };
    // save to local storage
    saveTasks();
    //increate task counter for next unique id
    taskIdCounter ++;

};

//display task on html
function appendTask (ID, description, status) {

  //create new task div element
  var newDivElement = document.createElement('div');
  newDivElement.classList = "newTask";//add class to div
  newDivElement.setAttribute("data-taskId", ID);//add unique task id
  

  //create new p element
  var newPElement = document.createElement('p');
  newPElement.innerHTML = description;
 
  //create new delete button
  var newDeleteBtn = document.createElement('button');
  newDeleteBtn.classList = 'deleteBtn button is-link is-normal is-outlined is-focused button-text-hover-color is-family-monospace'; //add classes too delete button
  newDeleteBtn.setAttribute("data-taskId", ID); //add id counter
  var iconTrash = document.createElement('i'); //create trash icon element
  iconTrash.classList = 'fa fa-trash'; //add class to icon element
  newDeleteBtn.append(iconTrash);


  //create new status button
  var statusSelectorBtn = document.createElement('select');
  statusSelectorBtn.classList = 'selectStatus button is-link is-normal is-outlined is-focused button-text-hover-color is-family-monospace'; //add classes to complete button
  statusSelectorBtn.setAttribute('name','statusChange'); //create name and status
  statusSelectorBtn.setAttribute("data-taskId", ID); //set task Id
  
  var statusChoices = ['To Do', 'In Progess', 'Completed']; //create the drop down with 3  status options
  for(var i=0; i<statusChoices.length; i++){
      var optionsElement = document.createElement('option');
      optionsElement.textContent = statusChoices[i];
      optionsElement.setAttribute('value', statusChoices[i]);

      statusSelectorBtn.appendChild(optionsElement);
  }

  //append to new div element
  newDivElement.append(newPElement);
  newDivElement.append(newDeleteBtn);
  newDivElement.append(statusSelectorBtn);
  //append to task body section
  tasksBodySection.append(newDivElement);

  //update taskStatus for this specific task
  taskStatus(ID, status);

};

//save array to local storage
var saveTasks = function(){
  localStorage.setItem('Calendar', JSON.stringify(calendarArray));
}

//load tasks saved from local storage
var loadTasks = function(){
  var calendar = localStorage.getItem('Calendar');
  if(calendar == null){ //if null than have local storage copy current calendar array
    calendar = calendarArray;
  }
  if(calendar != null){ //if not null update calendararray to match local storage array
    calendar = JSON.parse(calendar);
    calendarArray = calendar;

    for(var i=0; i<calendarArray.length; i++){
      //display the current day tasks
      if(calendarArray[i].date == currentDaySelected.getAttribute('value')){

        for(var j=0; j<calendarArray[i].task.length; j++){
          var Id = calendarArray[i].task[j].ID;
          var descrip = calendarArray[i].task[j].description;
          var stat = calendarArray[i].task[j].status;
          appendTask(Id,descrip,stat);
        }
      }
    }
  }
}

//add eventlistener to the calendar
var calendarDivElm = document.querySelector('#calendarDiv');
calendarDivElm.addEventListener("click", changeDaySelected);

//when day is selected
function changeDaySelected (event){
  while (tasksBodySection.firstChild) {
    tasksBodySection.removeChild(tasksBodySection.firstChild); //remove all divs currently on display
  }
  
  var newDay = event.target.getAttribute('value'); //get day selected value attribute
  currentDaySelected.innerHTML = "Task for " + dayjs().format('MMM') + newDay; //update the task header day
  currentDaySelected.setAttribute('value', newDay); 

  for(var i=0; i<calendarArray.length; i++){

    if(calendarArray[i].date == currentDaySelected.getAttribute('value')){

      for(var j=0; j<calendarArray[i].task.length; j++){ //retreive all the task  in local storage for selected day
        var Id = calendarArray[i].task[j].ID;
        var descrip = calendarArray[i].task[j].description;
        var stat = calendarArray[i].task[j].status;
        appendTask(Id,descrip,stat); //send to appendTask funtion to make divs
      }
    }
  }

  saveTasks(); //update local storage
  
};

loadTasks();

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

//color code the task by status selected
function taskStatus(taskId, optionsValue){
    var taskSeleted = document.querySelector(".newTask[data-taskId='" + taskId + "']");

    if(optionsValue == 'To Do'){
        taskSeleted.setAttribute('style','background-color: lightgrey');
    }
    if(optionsValue == 'In Progess'){
        taskSeleted.setAttribute('style','background-color: lightblue');
    }
    if(optionsValue == 'Completed'){
        taskSeleted.setAttribute('style','background-color: lightgreen');
    }

    //update task status in calendar array
    for(i=0; i<calendarArray.length; i++){

      if(calendarArray[i].date == currentDaySelected.getAttribute('value')){
        for(var j=0; j<calendarArray[i].task.length; j++){
          if(calendarArray[i].task[j].ID == parseInt(taskId)){
            calendarArray[i].task[j].status = optionsValue;

          }
        }
      }
    };
    // save to local storage
    saveTasks();
}

//delete task with matched id
function deleteTask(taskId){
  var taskSeleted = document.querySelector(".newTask[data-taskId='" + taskId + "']");
  taskSeleted.remove(); //remove specific task from html

  var updatedTaskArray = [];
  for(i=0; i<calendarArray.length; i++){
    if(calendarArray[i].date == currentDaySelected.getAttribute('value')){
      
      for(var j=0; j<calendarArray[i].task.length; j++){
        if(calendarArray[i].task[j].ID !== parseInt(taskId)){
          updatedTaskArray.push(calendarArray[i].task[j]);
        }
      }
      calendarArray[i].task = updatedTaskArray;
    };
  };
  // save to local storage
  saveTasks();
}


// News API
 var newsAPIKey = '0900507225f199f888ac631aab4e6f4f';

 var newsCall = function(){
   var newsApiUrl = 'https://api.mediastack.com/v1/news?access_key=' + newsAPIKey + '&sources=us&date=2021-11-24&sources=en&limit=1';
   console.log(newsApiUrl);
   fetch(newsApiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          newsAppend(data.data[0].title,data.data[0].description,data.data[0].url);
        });
      } 
    })
  };

 newsCall();

 function newsAppend(title, description, url){
   //create new news article div element
  var newsSectionElement = document.createElement('div');
  newsSectionElement.classList = "is mobile";
  newsSectionElement.setAttribute("id", 'newsSection');

  //create h1 title 
  var newsSectionTitle = document.createElement('h1');
  newsSectionTitle.classList = 'subtitle is-mobile';
  newsSectionTitle.innerHTML = "Today's Current News";
  newsSectionElement.append(newsSectionTitle);

  //create new article div
  var articleElement = document.createElement('div');

  //create articleTitle p
  var articleTitle = document.createElement('p');
  articleTitle.innerHTML = 'Article Title: ' + title;
  articleElement.append(articleTitle);

  //create articleDescription p
  var articleDescription = document.createElement('p');
  articleDescription.innerHTML = 'Article Title: ' + description;
  articleElement.append(articleDescription);

  //create url <a>
  var articleLink = document.createElement('a');
  articleLink.setAttribute("href", url);
  articleLink.classList = "deleteBtn button is-link is-normal is-outlined is-focused button-text-hover-color is-family-monospace";
  articleLink.innerHTML = "Read News Article";
  articleElement.append(articleLink);

  newsSectionElement.append(articleElement);
  taskBarHeaderSection.append(newsSectionElement);

 }


//// ------------- End of Rylee's javascript ------------------ ///
