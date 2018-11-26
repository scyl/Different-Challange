function testLeaseDate() {
  testLeaseDateCreation();
  testLeaseDateGetDayOfWeek();
  testLeaseDateShiftDays();
  testLeaseDateGetDateNextMonth();

  testLeaseDateGetDaysTilDayOfWeek();
  testLeaseDateGetDaysTil();
  testLeaseDateCompare();
}

function testLeaseDateCreation() {
  console.log("Testing LeaseDate Creation and toString()");

  let date = "2000-08-30";
  let leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "August, 30th 2000") {
    console.log("FAILED: " + date);
  }

  date = "1864-12-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "December, 31st 1864") {
    console.log("FAILED: " + date);
  }

  date = "2163-01-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "January, 31st 2163") {
    console.log("FAILED: " + date);
  }

  date = "2020-02-02";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "February, 2nd 2020") {
    console.log("FAILED: " + date);
  }

  date = "2132-05-13";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "May, 13th 2132") {
    console.log("FAILED: " + date);
  }

  date = "2018-11-26";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "November, 26th 2018") {
    console.log("FAILED: " + date);
  }

  date = "2016-07-23";
  leaseDate = new LeaseDate(date);
  if (leaseDate.toString() !== "July, 23rd 2016") {
    console.log("FAILED: " + date);
  }
}

function testLeaseDateGetDayOfWeek() {
  console.log("Testing LeaseDate getDayOfWeek()");

  let date = "2000-08-30";
  let leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 3) {
    console.log("FAILED: " + date);
  }

  date = "1864-12-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 6) {
    console.log("FAILED: " + date);
  }

  date = "2163-01-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 1) {
    console.log("FAILED: " + date);
  }

  date = "2020-02-02";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 0) {
    console.log("FAILED: " + date);
  }

  date = "2132-05-13";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 2) {
    console.log("FAILED: " + date);
  }

  date = "2018-11-26";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 1) {
    console.log("FAILED: " + date);
  }

  date = "2016-07-22";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDayOfWeek() !== 5) {
    console.log("FAILED: " + date);
  }
}

function testLeaseDateShiftDays() {
  console.log("Testing LeaseDate shiftDays()");

  let date = "2000-08-30";
  let shift = 1;
  let leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "August, 31st 2000") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "1864-12-31";
  shift = 3;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "January, 3rd 1865") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "2163-01-31";
  shift = 20;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "February, 20th 2163") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "2020-02-02";
  shift = -2;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "January, 31st 2020") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "2132-05-13";
  shift = -300;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "July, 18th 2131") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "2018-11-26";
  shift = 36;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "January, 1st 2019") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }

  date = "2016-07-23";
  shift = 7;
  leaseDate = new LeaseDate(date);
  if (leaseDate.shiftDays(shift).toString() !== "July, 30th 2016") {
    console.log("FAILED: " + date + "shifted by " + shift);
  }
}

function testLeaseDateGetDateNextMonth() {
  console.log("Testing LeaseDate getDateNextMonth()");

  let date = "2000-08-30";
  let leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "September, 30th 2000") {
    console.log("FAILED: " + date);
  }

  date = "1864-12-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "January, 31st 1865") {
    console.log("FAILED: " + date);
  }

  date = "2163-01-31";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "February, 31st 2163") {
    console.log("FAILED: " + date);
  }

  date = "2020-02-02";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "March, 2nd 2020") {
    console.log("FAILED: " + date);
  }

  date = "2132-05-13";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "June, 13th 2132") {
    console.log("FAILED: " + date);
  }

  date = "2018-11-26";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "December, 26th 2018") {
    console.log("FAILED: " + date);
  }

  date = "2016-07-23";
  leaseDate = new LeaseDate(date);
  if (leaseDate.getDateNextMonth().toString() !== "August, 23rd 2016") {
    console.log("FAILED: " + date);
  }
}
