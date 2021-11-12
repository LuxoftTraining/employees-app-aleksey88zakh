export function removeEmployee(employees, id) {
    return employees.filter(e=>e.id!==id);
}

export function addEmployee(employees, newEmployees, name, surname) {
    if (!name || name.length==0 || !surname || surname.length==0) {
     throw new Error("name and surname should be not empty");
    }
    let max = 0;
    for (let e of employees) {
     if (e.id>max) max = e.id;
    }
    let id = max+1;
    newEmployees = [...employees, {id,name,surname}];
    return id;
}

export function addPhone(employee, phone) {
    if (!employee) {
        return;
    }
    const phones = employee.phones;
    if (!phones) {
     employee.phones = [];
    }
    let newPhones = [...phones, phone];
    employee.phones = newPhones; //?
}