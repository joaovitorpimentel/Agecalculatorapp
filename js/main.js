var age_day = "- -";
var age_month = "- -";
var age_year = "- -";

function getInput() {
    var day = document.getElementById("day");
    var month = document.getElementById("month");
    var year = document.getElementById("year");

    if (!day || !month || !year) {
        return;
    } 

    const today = new Date();
    let year_t = today.getFullYear();
    let month_t = today.getMonth() + 1; // month is index-based
    let day_t = today.getDate();

    day = day.value;
    month = month.value; 
    year = year.value;

    /** Check for empty or invalid values */
    var error_vals = isValidDay(day, month, year);
    error_vals += isValidMonth(month);
    error_vals += isValidYear(month, year, month_t, year_t);

    if (error_vals > 0) {
        // change all styles to red
        var titles = document.getElementsByTagName('h3');
        for (var i = 0; i < titles.length; i++) {
            titles[i].style.color = "var(--light_red)";
        }
        var elements = document.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.border = "2px solid var(--light_red)";
        }
        age_day = "- -";
        age_month = "- -";
        age_year = "- -";
    } else {
        var titles = document.getElementsByTagName('h3');
        for (var i = 0; i < titles.length; i++) {
            titles[i].style.color = "var(--smokey_grey)";
        }
        var elements = document.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.border = "2px solid var(--light_grey)";
        }
        
        if (day_t < day) {
            const temp = new Date(year_t, month_t, 0);
            day_t += temp.getDate();
            month_t -= 1;
        }
        if (month_t < month) {
            month_t += 12;
            year_t -= 1;
        }

        age_day = day_t - day;
        age_month = month_t - month;
        age_year = year_t - year;
    }

    getAge();
}

function isValidDay(day, month, year) {
    let months_31 = [1, 3, 5, 7, 8, 10, 12];

    if (day == "") {
        document.getElementById('error-day').innerHTML = "This field is required.";
        return 1;
    } else if (day < 1 || day > 31) {
        document.getElementById('error-day').innerHTML = "Must be a valid day.";
        document.g
        return 1;
    } else if (month == 2) {
        if (day > 29) {
            document.getElementById('error-day').innerHTML = "Must be a valid day.";
            return 1;
        } else if (year % 4 != 0 && day == 29) {
            document.getElementById('error-day').innerHTML = "Must be a valid day.";
            return 1;
        } 
    } else if (day > 30 && !months_31.includes(month)) {
        document.getElementById('error-day').innerHTML = "Must be a valid day.";
       return 1;
    } 
    document.getElementById('error-day').innerHTML = "";
    return 0;
}

function isValidMonth(month) {
    if (month == "") {
        document.getElementById('error-month').innerHTML = "This field is required.";
        return 1;
    } else if (month < 1 || month > 12) {
        document.getElementById('error-month').innerHTML = "Must be a valid month.";
        return 1;
    } 
    document.getElementById('error-month').innerHTML = "";
    return 0;
}

function isValidYear(month, year, month_t, year_t) {
    if (year == "") {
        document.getElementById('error-year').innerHTML = "This field is required.";
        return 1;
    } else if (year > year_t) {
        document.getElementById('error-year').innerHTML = "Must be in the past.";
        return 1;
    } else if (year == year_t && month > month_t) {
        document.getElementById('error-year').innerHTML = "Must be in the past.";
        return 1;
    } else if (year == year_t && month == month_t && day > day_t) {
        document.getElementById('error-year').innerHTML = "Must be in the past.";
        return 1;
    } 
    document.getElementById('error-year').innerHTML = "";
    return 0;
}

function getAge() {
    let year = document.getElementById('age-year');
    if (year) {
        year.innerHTML = age_year;
    }

    let month = document.getElementById('age-month');
    if (month) {
        month.innerHTML = age_month;
    }

    let day = document.getElementById('age-day');
    if (day) {
        day.innerHTML = age_day;
    }
}