// Object for a single lease
var Lease = (function() {
  // Constructor
  function Lease(id, startDate, endDate, rent, paymentDay, frequency) {
    this.id         = id;
    this.startDate  = startDate;
    this.endDate    = endDate;
    this.rent       = rent;
    this.paymentDay = paymentDay;
    this.frequency  = frequency;
  }

  const NUM_DAYS_IN_WEEK = 7;
  const NUM_DAYS_IN_FORTNIGHT = 14;
  const NUM_DAYS_IN_MONTHLY = 28;

  // Convert the lease to a string
  Lease.prototype.toString = function() {
    let message = "ID: " + this.id + "\n";
    message = message + "Date: " + this.startDate + " to " + this.endDate + "\n";
    message = message + "Rent: " + this.rent + "\n";
    message = message + "Frequency: " + this.frequency + "\n";
    message = message + "Payment Day: " + this.paymentDay + "\n";

    return message;
  }

  // Generate an array of all the payments for this lease
  Lease.prototype.paymentData = function() {
    // Create a LeaseDate for both start and end dates
    let start = new LeaseDate(this.startDate);
    let end = new LeaseDate(this.endDate);

    // Create the final array
    let data = [];

    // Variables for generating payment data
    let curDate = start;
    let from;
    let to;

    // Loop until we are past of the end date
    while (curDate != null) {
      // This payment start from the current date
      from = curDate;

      // Get the date for the next payment
      curDate = getNextPaymentDate(curDate, this.paymentDay, this.frequency, end);
      // This payment ends either on the end date of the lease or
      // the day before the next payment
      if (curDate === null) {
        to = end;
      } else {
        to = curDate.shiftDays(-1);
      }

      // Add this payment to the array
      data.push(new Data(from, to, this.rent));
    }

    return data;
  }

  // Get the first date of the next payment paymentPeriod
  // Return null if there is no next payment
  function getNextPaymentDate(from, paymentDay, frequency, endDate) {
    let nextDate = null;
    let paymentDayOfWeek = convertDayOfWeekToNum(paymentDay);

    if (from.getDayOfWeek() === paymentDayOfWeek) {
      // If the current payment is on the target day of the week
      // Then next payment date is 7(weekly) or 14(fortnightly) or 28(monethly) days later
      nextDate = from.shiftDays(convertFrequencyToNum(frequency));
    } else {
      // If the current payment is NOT on the target day of the weekly
      // Then next payment date is the number of days until that day of the week
      nextDate = from.shiftDays(from.getDaysTilDayOfWeek(paymentDayOfWeek));
    }


    // If the next payment is after the end of the lease
    if (nextDate.compare(endDate) > 0) {
      // We return null instead
      nextDate = null;
    }
    return nextDate;
  }

  // Convert a day of the week to a number
  // Sunday   -> 0
  // Monday   -> 1
  // ...
  // Saturday -> 6
  function convertDayOfWeekToNum(day) {
    if (day === "monday") {
      return 1;
    }
    if (day === "tuesday") {
      return 2;
    }
    if (day === "wednesday") {
      return 3;
    }
    if (day === "thursday") {
      return 4;
    }
    if (day === "friday") {
      return 5;
    }
    if (day === "saturday") {
      return 6;
    }
    if (day === "sunday") {
      return 0;
    }
    return null;
  }

  // Convert a frequency to the number of days
  function convertFrequencyToNum(frequency) {
    if (frequency === "weekly") {
      return NUM_DAYS_IN_WEEK;
    }

    if (frequency === "fortnightly") {
      return NUM_DAYS_IN_FORTNIGHT;
    }

    if (frequency === "monthly") {
      return NUM_DAYS_IN_MONTHLY;
    }

    return null;
  }

  return Lease;
})();

// A object for the data of each payment period
var Data = function() {
  function Data(from, to, rent) {
    this.paymentFrom   = from.toString();
    this.paymentTo     = to.toString();
    this.paymentPeriod = from.getDaysTil(to) + 1;
    this.paymentAmount = "$" + calPaymentAmount(rent, this.paymentPeriod);
  }

  const NUM_DAYS_IN_WEEK = 7;

  Data.prototype.toString = function() {
    return this.paymentFrom + this.paymentTo + this.paymentPeriod + this.paymentAmount;
  }

  // Calculate the amount in the payment
  function calPaymentAmount(rent, period) {
    return roundToOneDecimal(period * (rent/NUM_DAYS_IN_WEEK));
  }

  // Round given number to one decimal place
  function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }

  return Data;
}();
