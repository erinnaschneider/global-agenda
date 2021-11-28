  //https request for holidays 
  fetch ("https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11")
  .then (function (response){
  return response.json();
  })
  .then(function (data) {
      console.log(data);
  })

  // user pick country
  // year and month picked from day.js
  // append on day currently selected in task area
   

