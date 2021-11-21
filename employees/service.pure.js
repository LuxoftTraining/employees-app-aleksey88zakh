export function removeEmployee(employees, id) {
    return employees.filter(e=>e.id!==id);
}

export function addEmployee(employees, newEmployee) {
    if (!isFullNameValid(newEmployee)) {
     throw new Error("name and surname should be not empty");
    }
    let id = Math.max.apply(null, employees.map(e=>e.id)) + 1;
    return [...employees, {...newEmployee, id}];
}

function isFullNameValid(employee) {
    return !!employee.name && employee.name.length!==0 && !!employee.surname && employee.surname.length!==0;
}

export function addPhone(employee, phone) {
    const phones = !!employee.phones ? employee.phones : [];
    let newPhones = [...phones, phone]; 
    return {...employee, phones: newPhones};
}

export function setDateOfBirth(employee, date) {
    return {...employee, dateOfBirth: date};
}

export function setEmployeeManager(employee, managerId) {
    return {...employee, managerRef: managerId}
}