let testEmployees = [
  ["gary", "worm", "security", 3],
  ["tom", "holland", "professor", 4],
  ["harry", "styles", "musician", 4],
  ["bob", "sagget", "actor", 4],
];

function createEmployeeRecord(employee) {
  let record = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return record;
}

// console.log(createEmployeeRecord(testEmployees));

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(createEmployeeRecord);
}

// console.log(createEmployeeRecords(testEmployees));

function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(" ");
  hour = parseInt(hour);
  let type = "TimeIn";
  this.timeInEvents.push({ type, hour, date });
  return this;
}
// console.log(
//   createTimeInEvent(createEmployeeRecords(testEmployees)[1], "08/12/2021 800")
// );

function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(" ");
  hour = parseInt(hour);
  let type = "TimeOut";
  this.timeOutEvents.push({ type, hour, date });
  return this;
}
// console.log(
//   createTimeOutEvent(createEmployeeRecords(testEmployees)[1], "08/12/2021 1800")
// );

function hoursWorkedOnDate(workDate) {
  let clockedIn = this.timeInEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  let clockedOut = this.timeOutEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  return (clockedOut - clockedIn) / 100;
}

function wagesEarnedOnDate(date) {
  return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

function findEmployeeByFirstName(array, firstN) {
  return array.find((object) => object.firstName === firstN);
}

function calculatePayroll(array) {
  return array
    .map((object) => allWagesFor.call(object))
    .reduce((a, b) => (a = a + b), 0);
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
