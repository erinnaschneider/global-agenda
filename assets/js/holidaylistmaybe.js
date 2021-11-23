// document.getElementById('dropbtn').onclick = function() {
 
//     var values = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30",];
 
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


//https request for holidays on 11/01/2021 from Abstract API
  var day1 = document.getElementById("day1");
  var getHolidayName = function() {
  fetch ("https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=1")
  .then (function (response){
  return response.json();
  })
  .then(function (data) {
      console.log(data);

for (var i=0; i<data.length; i++){
    var day1El = document.createElement("p");
    day1El.textContent = data[i].name
    day1El.setAttribute("class", "dayElements");
    day1.appendChild(day1El);

}})}

getHolidayName ();
// var dayInput = document.querySelector("day");
// //var holidayName = dayInput.name.trim();
// // for loop to get holidays per day of month of November
// for (var i=0; i < 30; i++) {
// // api https from Abstract
//  var apiUrl = "https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=1" + i;
// // fetch api and request to return data in JSON
//     fetch(apiUrl)
//     .then (function (response){
//         return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
// // populate data 
// var day1El = document.createElement("p");
//         day1El.textContent = data[i].name
//         day1El.setAttribute("class", "dayElements");
//         day1.appendChild(day1El);       
//  })

//populate data!!!
//1. create html element
// 2.  give it content
// 3. append to page