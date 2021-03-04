// Your code here
function createEmployeeRecord(employeeInfo) {
    let employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord); 
}

function createTimeInEvent(obj, timeStamp) {
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
        }
    obj.timeInEvents.push(timeInEvent)
    return obj
}

function createTimeOutEvent(obj, timeStamp){
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
        }
    obj.timeOutEvents.push(timeOutEvent)
    return obj
}

function hoursWorkedOnDate(obj, date) {
    let timeOut = obj.timeOutEvents.find(o => o.date === date).hour
    let timeIn = obj.timeInEvents.find(o => o.date === date).hour
    let timeWorked = (timeOut - timeIn)/100
    return timeWorked;
}

function wagesEarnedOnDate(obj, date) {
    let payPerHour = obj.payPerHour
    let wages = hoursWorkedOnDate(obj, date) * payPerHour
    return wages;
}

function allWagesFor(obj) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let dates = obj.timeInEvents.map(te => te.date)
    let wages = dates.map(date => wagesEarnedOnDate(obj, date))
    let total = wages.reduce(reducer)
    return total;
} 

function calculatePayroll(array) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let wages = array.map(obj => allWagesFor(obj))
    let total = wages.reduce(reducer)
    return total;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find( i => i.firstName === firstName)
}