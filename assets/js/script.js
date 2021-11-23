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
        name = `<p class="name">${dayName}</p>`
        console.log(date.getDay());
    }

    let weekend = theWeekend(day)

    calendar.insertAdjacentHTML("beforeend",`<div class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
};