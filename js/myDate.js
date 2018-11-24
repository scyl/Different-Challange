var MyDate = (function() {
  function MyDate(dateString) {
    this.date = new Date(dateString);
    this.date.setUTCHours(2);
  }

  const NUM_MS_IN_DAY = 86400000; //*24*60*60*1000

  MyDate.prototype.toString = function() {
    let string = "";

    string = string + monthToString(this.date.getUTCMonth()) + ", ";
    string = string + dayToString(this.date.getUTCDate()) + " ";
    string = string + this.date.getUTCFullYear().toString();

    return string;
  }

  MyDate.prototype.getDayOfWeek = function() {
    return this.date.getDay();
  }

  MyDate.prototype.shiftDays = function(numDays) {
    return new MyDate(getDateShifted(this.date, numDays).toString());
  }

  MyDate.prototype.getDateNextMonth = function(date) {
    let year = this.date.getFullYear();
    let month = this.date.getMonth()+1;
    let day = this.date.getDate();

    if (month === 12) {
      month = 0;
      year++;
    }

    let newDate = new Date("2018-01-01");
    newDate.setUTCFullYear(year);
    newDate.setUTCMonth(month);
    newDate.setUTCDate(day);
    newDate.setUTCHours(2);

    return new MyDate(newDate.toString());
  }

  MyDate.prototype.getDaysTilDayOfWeek = function(dayOfWeek) {
    // Calculate days between now to next paymentDayOfWeek
    return (dayOfWeek + 7 - this.date.getDay())%7;
  }

  MyDate.prototype.getDaysTil = function(otherDate) {
    let date1 = this.date;
    let date2 = otherDate.date;

    let diff = date2.getTime() - date1.getTime();
    return msToDays(diff);
  }

  MyDate.prototype.compare = function(otherDate) {
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

  function getDateShifted(date, days) {
    return new Date(parseInt(date.getTime()) + parseInt(numDaysInMS(days)));
  }

  function numDaysInMS(numDays) {
    return numDays * NUM_MS_IN_DAY;
  }

  function msToDays(ms) {
    return ms / NUM_MS_IN_DAY;
  }

  function monthToString(month) {
    let monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthStrings[month];
  }

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

  return MyDate;
})();
