import { employeeManagerView, addEmployeeView } from "./ui";
import { DATA } from './employees-json';
const employees = DATA.employees;

String.prototype.trimAll = function () {
    return this.replace(/>\s+</g, '><').replace(/\s\s+/g, ' ').trim()
};


test('employeeManagerView', () =>
    expect(employeeManagerView(employees, 135).trimAll()).toEqual(`
        <span>
            <select>
                <option value="1" >Пафнутий Пафнутьев</option>
                <option value="133" >Иван Иванов</option>
                <option value="134" >Анна Петрова</option>
                <option value="135" selected>Николай Сидоров</option>
            </select>
         </span>
    `.trimAll())
);

String.prototype.removeTags = function () {
    return this.replace(/<[^>]+>/g, '').trimAll()
};

test('employeeManagerView Text', () =>
    expect(employeeManagerView(employees, 135).removeTags())
        .toEqual(
            "Пафнутий ПафнутьевИван ИвановАнна ПетроваНиколай Сидоров")
);

test('addEmployeeView html', () =>
    expect(addEmployeeView(employees, { name: "Иван", surname: "Петров"}).trimAll()).toEqual(`
    <h3>Добавление сотрудника</h3>
    <label for="name">Имя:</label>
    <input id="name" placeholder="Имя">
    <label for="surname">Фамилия:</label>
    <input id="surname" placeholder="Фамилия"></input>
    <label for="managerSelect">Менеджер:</label>
    <span>
            <select id="managerSelect">
                <option value="1" selected>Пафнутий Пафнутьев</option>
                <option value="133" >Иван Иванов</option>
                <option value="134" >Анна Петрова</option>
                <option value="135" >Николай Сидоров</option>
            </select>
    </span>
    <p>
            <button onclick="setEmployees(addEmployeeUI())" id="addEmployeeButton">
            Добавить сотрудника</button>
    </p>
    `.trimAll())
);

test('addEmployeeView html with invalid name', () =>
    expect(addEmployeeView(employees, { name: "", surname: "Петров"}).trimAll()).toEqual(`
    <h3>Добавление сотрудника</h3>
    <label for="name">Имя:</label>
    <input id="name" placeholder="Имя">
    <label for="surname">Фамилия:</label>
    <input id="surname" placeholder="Фамилия"></input>
    <label for="managerSelect">Менеджер:</label>
    <span>
            <select id="managerSelect">
                <option value="1" selected>Пафнутий Пафнутьев</option>
                <option value="133" >Иван Иванов</option>
                <option value="134" >Анна Петрова</option>
                <option value="135" >Николай Сидоров</option>
            </select>
    </span>
    <div id="addEmployeeFormErrorMessage">- Имя сотрудника должно быть задано<br></div>
    <p>
            <button onclick="setEmployees(addEmployeeUI())" id="addEmployeeButton">
            Добавить сотрудника</button>
    </p>
    `.trimAll())
);

test('addEmployeeView html with invalid name', () =>
    expect(addEmployeeView(employees, { name: "Иван", surname: ""}).trimAll()).toEqual(`
    <h3>Добавление сотрудника</h3>
    <label for="name">Имя:</label>
    <input id="name" placeholder="Имя">
    <label for="surname">Фамилия:</label>
    <input id="surname" placeholder="Фамилия"></input>
    <label for="managerSelect">Менеджер:</label>
    <span>
            <select id="managerSelect">
                <option value="1" selected>Пафнутий Пафнутьев</option>
                <option value="133" >Иван Иванов</option>
                <option value="134" >Анна Петрова</option>
                <option value="135" >Николай Сидоров</option>
            </select>
    </span>
    <div id="addEmployeeFormErrorMessage">- Фамилия сотрудника должна быть задана<br></div>
    <p>
            <button onclick="setEmployees(addEmployeeUI())" id="addEmployeeButton">
            Добавить сотрудника</button>
    </p>
    `.trimAll())
);

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

const employee136WithManager =
{
    id: 136,
    name: "Иван",
    surname: "Петров",
    managerRef: 1
}