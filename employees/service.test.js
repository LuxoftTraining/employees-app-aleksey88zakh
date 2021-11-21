import { removeEmployee, addEmployee, addPhone, setDateOfBirth, setEmployeeManager } from './service.pure';
import { DATA } from './employees-json';
const employees = DATA.employees;

const employeesRemoved135 = [
    {
        id: 1,
        name: "Пафнутий",
        surname: "Пафнутьев",
        department: "IT",
        salary: 1000,
        dateOfBirth: "2000-01-01"
    },
    {
        id: 133,
        name: "Иван",
        surname: "Иванов",
        department: "DBA",
        salary: 1000,
        phones: ["123-34-56", "234-56-81"],
        dateOfBirth: "2000-02-01"
    },
    {
        id: 134,
        name: "Анна",
        surname: "Петрова",
        department: "Dev",
        salary: 1000,
        dateOfBirth: "2001-02-01"
    }
];

const employeesAdd136 = [
    {
        id: 1,
        name: "Пафнутий",
        surname: "Пафнутьев",
        department: "IT",
        salary: 1000,
        dateOfBirth: "2000-01-01"
    },
    {
        id: 133,
        name: "Иван",
        surname: "Иванов",
        department: "DBA",
        salary: 1000,
        phones: ["123-34-56", "234-56-81"],
        dateOfBirth: "2000-02-01"
    },
    {
        id: 134,
        name: "Анна",
        surname: "Петрова",
        department: "Dev",
        salary: 1000,
        dateOfBirth: "2001-02-01"
    },
    {
        id: 135,
        name: "Николай",
        surname: "Сидоров",
        department: "QT",
        salary: 1000,
        dateOfBirth: "2001-01-01"
    },
    {
        id: 136,
        name: "Иван",
        surname: "Петров"
    }
];

const employee1WithPhone =
{
    id: 1,
    name: "Пафнутий",
    surname: "Пафнутьев",
    department: "IT",
    salary: 1000,
    phones: ["34-12-22"],
    dateOfBirth: "2000-01-01"
};

const employee133WithPhones =
{
    id: 133,
    name: "Иван",
    surname: "Иванов",
    department: "DBA",
    salary: 1000,
    phones: ["123-34-56", "234-56-81", "567-34-92"],
    dateOfBirth: "2000-02-01"
};

const employee135AnotherBirth =
{
    id: 135,
    name: "Николай",
    surname: "Сидоров",
    department: "QT",
    salary: 1000,
    dateOfBirth: "2002-06-01"
};

const employee133WithManager =
{
    id: 133,
    name: "Иван",
    surname: "Иванов",
    department: "DBA",
    salary: 1000,
    phones: ["123-34-56", "234-56-81"],
    dateOfBirth: "2000-02-01",
    managerRef: 135
};

//tests for service.pure.js
///
//remove
test('removeEmployee', () =>
    expect(removeEmployee(employees, 135))
        .toEqual(employeesRemoved135)
);

//add
test('addEmployee', () =>
    expect(addEmployee(employees, {name: "Иван", surname: "Петров"}))
        .toEqual(employeesAdd136)
);

//add with invalid name
test('addEmployeeInvalidName', () =>
    expect(() => addEmployee(employees, {name: "", surname: "Петров"}))
        .toThrow("name and surname should be not empty")
);

//add with invalid surname
test('addEmployeeInvalidSurname', () =>
    expect(() => addEmployee(employees, {name: "Иван", surname: ""}))
        .toThrow("name and surname should be not empty")
);

//phone
test('addPhone', () =>
    expect(addPhone(employees[0], "34-12-22"))
        .toEqual(employee1WithPhone)
);

//phones
test('addExtraPhone', () =>
    expect(addPhone(employees[1], "567-34-92"))
        .toEqual(employee133WithPhones)
);

//date of birth
test('dateOfBirth', () =>
    expect(setDateOfBirth(employees[3], "2002-06-01"))
        .toEqual(employee135AnotherBirth)
);

//manager
test('setManager', () =>
    expect(setEmployeeManager(employees[1], 135))
        .toEqual(employee133WithManager)
);
