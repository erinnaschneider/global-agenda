// document.getElementById('dropbtn').onclick = function() {
 
//     var values = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30",];
//     var values = ["US","CA","MX"]
//     var select = document.createElement("myDropdown");
//     select.name = "pets";
//     select.id = "pets"
 
//     for (const val of values)
//     {
//         var option = document.createElement("option");
//         option.value = val;
//         option.text = val.charAt(0).toUpperCase() + val.slice(1);
//         select.appendChild(option);
//     }
 
//     var label = document.createElement("label");
//     label.innerHTML = "Select a day: "
//     label.htmlFor = "days";
 
//     document.getElementById("container").appendChild(label).appendChild(select);
// }

//show and hide dropdown list items on button click
// function show_hide() {
//     var click = document.getElementById("drop-down content");
//     if(click.style.display ==="none") {
//         click.style.display ="block";
//     }else {
//         click.style.display ="none";
//     }
// }

//Fetching US Holiday Names for 11/25/2021 from Abstract API
//   var day24 = document.getElementById("calendarDiv");
//   var getHolidayNameus = function() {
//   fetch ("https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=25")
//   .then (function (response){
//   return response.json();
//   })
//   .then(function (data) {
//       console.log(data);
// //populate data!!!
// //1. create html element
// for (var i=0; i<data.length; i++){
//     var day1El = document.createElement("p-2");
//     // 2.  give it content
//     day1El.textContent = data[i].name
//     day1El.setAttribute("class", "dayElements");
//     // 3. append to page
//     day1.appendChild(day1El);
// }
// })}

// getHolidayNameus ();




// const abstract_url = 'https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=25' 
// async function getUSHoliday() {
//     const response = await fetch (abstract_url);
//     const data = await response.json();
//     console.log(data);



// getUSHoliday();


// const abstract_url = 'https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=25' 
// async function getUSHoliday() {
// const response = await fetch (abstract_url);
// const data = await response.json();
// console.log(data);
// }
// getUSHoliday();

// getUSHoliday.appendChild('#p-2'); 