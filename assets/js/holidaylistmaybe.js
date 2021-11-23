  //https request for holidays on 11/01/2021
  fetch ("https://holidays.abstractapi.com/v1/?api_key=e2012bd7586b4502b4d64c61f9a7eed8&country=US&year=2021&month=11&day=1")
  .then (function (response){
  return response.json();
  })
  .then(function (data) {
      console.log(data);
  })
    
   

