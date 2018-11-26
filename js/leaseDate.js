// A custom date object to handle leases
// We store the date in UTC time
var LeaseDate = (function() {
  // Constructor
  function LeaseDate(dateString) {
    this.date = new Date(dateString);
    // Set hours to 2 to make sure we are well into the days
    // Instead of leaving it at midnight
    this.date.setUTCHours(2);
  }

  // The number of milliseconds in a days
  const NUM_MS_IN_DAY = 86400000;

  // Convert the date to a string
  LeaseDate.prototype.toString = function() {
    let string = "";

    string = string + monthToString(this.date.getUTCMonth()) + ", ";
    string = string + dayToString(this.date.getUTCDate()) + " ";
    string = string + this.date.getUTCFullYear().toString();

    return string;
  }

  // Get the day of the week of date
  LeaseDate.prototype.getDayOfWeek = function() {
    return this.date.getDay();
  }

  // Get a new LeaseDate that's shifted by the given number of days
  LeaseDate.prototype.shiftDays = function(numDays) {
    return new LeaseDate(getDateShifted(this.date, numDays).toString());
  }

  // Get a new LeaseDate that's the same day in the next month
  LeaseDate.prototype.getDateNextMonth = function() {
    // Get the year, month and day in the next month
    let year  = this.date.getFullYear();
    let month = this.date.getMonth()+1;
    let day   = this.date.getDate();

    // If the month is after December, wrap around to January
    // And move to the next year
    if (month === 12) {
      month = 0;
      year++;
    }

    // Create a new JS date object
    // And set the year, month and day to the target date
    let newDate = new Date("2018-01-01");
    newDate.setUTCFullYear(year);
    newDate.setUTCMonth(month);
    newDate.setUTCDate(day);
    newDate.setUTCHours(2);

    return new LeaseDate(newDate.toString());
  }

  // Get the number of days until the given day of the week
  LeaseDate.prototype.getDaysTilDayOfWeek = function(dayOfWeek) {
    return (dayOfWeek + 7 - this.date.getDay())%7;
  }

  // Get the number of days until the given date
  LeaseDate.prototype.getDaysTil = function(otherDate) {
    let date1 = this.date;
    let date2 = otherDate.date;

    let diff = date2.getTime() - date1.getTime();
    return msToDays(diff);
  }

  // Compare this date with the given date
  // Return -1 if this date is before the given date
  // Return 0  if the dates are the same
  // Return 1  if this date is after the given date
  LeaseDate.prototype.compare = function(otherDate) {
    let date1 = this.date;
    let date2 = otherDate.date;

    let returnValue = 0;

    if (date1.getTime() < date2.getTime()) {
      returnValue = -1;
    }
    if (date1.getTime() > date2.getTime()) {
      returnValue = 1;
    }

    return returnValue;
  }

  // Shift the date by the given days
  function getDateShifted(date, days) {
    return new Date(parseInt(date.getTime()) + parseInt(numDaysInMS(days)));
  }

  // Get the total number of milliseconds in the given number of days
  function numDaysInMS(numDays) {
    return numDays * NUM_MS_IN_DAY;
  }

  // Get the number of days in the given milliseconds
  function msToDays(ms) {
    return ms / NUM_MS_IN_DAY;
  }

  // Convert the month to text
  function monthToString(month) {
    let monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthStrings[month];
  }

  // Convert the day to text
  function dayToString(day) {
    let dayString = day.toString();

    if (Math.floor(day/10) != 1) {
      if (day%10 === 1) {
        dayString = dayString + "st";
      } else if (day%10 === 2) {
        dayString = dayString + "nd";
      } else if (day%10 === 3) {
        dayString = dayString + "rd";
      } else {
        dayString = dayString + "th";
      }
    } else {
      dayString = dayString + "th";
    }

    return dayString;
  }

  return LeaseDate;
})();
