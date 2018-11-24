var Lease = (function() {

  function Lease(id, startDate, endDate, rent, paymentDay, frequency) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rent = rent;
    this.paymentDay = paymentDay;
    this.frequency = frequency;
  }

  const NUM_DAYS_IN_WEEK = 7;
  const NUM_DAYS_IN_FORTNIGHT = 14;

  Lease.prototype.toString = function() {
    let message = "ID: " + this.id + "\n";
    message = message + "Date: " + this.startDate + " to " + this.endDate + "\n";
    message = message + "Rent: " + this.rent + "\n";
    message = message + "Frequency: " + this.frequency + "\n";
    message = message + "Payment Day: " + this.paymentDay + "\n";

    return message;
  }

  Lease.prototype.paymentData = function() {
    let start = new MyDate(this.startDate);
    let end = new MyDate(this.endDate);

    let data = [];

    let curDate = start;
    let from;
    let to;

    while (curDate != null) {
      from = curDate;

      curDate = getNextPaymentDate(curDate, this.paymentDay, this.frequency, end);
      if (curDate === null) {
        to = end;
      } else {
        to = curDate.shiftDays(-1);
      }

      data.push(new Data(from, to, this.rent));
    }

    return data;
    //return dataArrayToArray(data);
  }

  function getNextPaymentDate(from, paymentDay, frequency, endDate) {
    let nextDate = null;
    let paymentDayOfWeek = convertDayOfWeekToNum(paymentDay);

    if (from.getDayOfWeek() === paymentDayOfWeek) {
      if (frequency === "monthly") {
        nextDate = from.getDateNextMonth(this.date);
      } else {
        nextDate = from.shiftDays(convertFrequencyToNum(frequency));
      }
    } else {
      nextDate = from.shiftDays(from.getDaysTilDayOfWeek(paymentDayOfWeek));
    }

    if (nextDate.compare(endDate) > 0) {
      nextDate = null;
    }
    return nextDate;
  }

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

  function convertFrequencyToNum(frequency) {
    if (frequency === "weekly") {
      return NUM_DAYS_IN_WEEK;
    }
    if (frequency === "fortnightly") {
      return NUM_DAYS_IN_FORTNIGHT;
    }
    return null;
  }

  // function dataArrayToArray(data) {
  //   let array = [];
  //
  //   for (i in data) {
  //     array.push([data[i].paymentFrom, data[i].paymentTo, data[i].paymentPeriod, data[i].paymentAmount]);
  //   }
  //
  //   return array;
  // }

  return Lease;
})();

var Data = function() {
  function Data(from, to, rent) {
    this.paymentFrom = from.toString();
    this.paymentTo = to.toString();
    this.paymentPeriod = from.getDaysTil(to) + 1;
    this.paymentAmount = this.paymentPeriod * (rent/NUM_DAYS_IN_WEEK);
  }

  const NUM_DAYS_IN_WEEK = 7;

  Data.prototype.toString = function() {
    return this.paymentFrom + this.paymentTo + this.paymentPeriod + this.paymentAmount;
  }

  return Data;
}();
