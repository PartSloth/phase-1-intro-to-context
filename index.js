function createEmployeeRecord(array) {
    let employeeObj = new Object();
    employeeObj.firstName = array[0];
    employeeObj.familyName = array [1];
    employeeObj.title = array[2];
    employeeObj.payPerHour = array[3];
    employeeObj.timeInEvents = [];
    employeeObj.timeOutEvents = []
    return employeeObj;
}

function createEmployeeRecords(array) {
    return array.map(empArr => createEmployeeRecord(empArr));
}

function createTimeInEvent(employeeObj, date) {
    const dateArr = date.split(' ');
    let timeInObj = new Object();
    timeInObj.type = "TimeIn";
    timeInObj.hour = parseInt(dateArr[1],10);
    timeInObj.date = dateArr[0];
    employeeObj.timeInEvents.push(timeInObj);
    return employeeObj;
}

function createTimeOutEvent(employeeObj, date) {
    const dateArr = date.split(' ');
    let timeOutObj = new Object();
    timeOutObj.type = "TimeOut";
    timeOutObj.hour = parseInt(dateArr[1],10);
    timeOutObj.date = dateArr[0];
    employeeObj.timeOutEvents.push(timeOutObj);
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
    const timeInArr = employeeObj.timeInEvents;
    const timeOutArr = employeeObj.timeOutEvents;
    for(let i = 0; i < timeInArr.length; i++) {
        if(timeInArr[i].date === date){
            const hoursWorked = (timeOutArr[i].hour - timeInArr[i].hour) / 100;
            return hoursWorked;
        }
    }
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
    const totalWagesArr = [];
    const clockedArr = employeeObj.timeInEvents;
    clockedArr.forEach(dayObj => {
        const daysWages = wagesEarnedOnDate(employeeObj, dayObj.date);
        totalWagesArr.push(daysWages);
    })
    return totalWagesArr.reduce((a, b) => a + b, 0);
}

function calculatePayroll(employeeArr) {
    const employeeTtlWagesArr = []
    employeeArr.forEach(employeeObj => {
        employeeTtlWagesArr.push(allWagesFor(employeeObj));
    })
    return employeeTtlWagesArr.reduce((a, b) => a + b, 0)   
}