let calendar = document.getElementById("calendarDiv");
let theWeekend = day => {
    return day === 6;
}

for (let day = 1; day <= 31; day = day + 1) {
    
    let date = new Date(Date.UTC(2021, 10, day));
    let options = { weekday: "short"};
    let name = "";

    if (day <= 7) {
        let dayName = new Intl.DateTimeFormat("en-US", options).format(date);
        name = `<div class="name">${dayName}</div>`
    }

    let weekend = theWeekend(day)

    calendar.insertAdjacentHTML("beforeend",`<div class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
};