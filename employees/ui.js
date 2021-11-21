import {
    getEmployees, removeEmployee,
    findById, searchEmployees
} from './service';
import { addEmployee, setEmployeeManager } from './service.pure';
import { Employee, jsonToEmployees } from "../model/Employee";
import { DATA } from './employees-json';

const PLACEHOLDER = "employeesPlaceholder";
const ADD_PANE = "addPane";

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

function showEmployees(employeesJSON) {
    let employees = jsonToEmployees(employeesJSON);
    const html = showEmployeesView(getEmployees(), employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;
}

function showEmployeesView(allEmployees, employees) {
    let li_items = employees.map(e =>
        `<li>${e} <button onclick="removeEmployeeUI(${e.id})">X</button>
        ${employeeManagerView(allEmployees, e.managerRef)}
          </li>`).join("");
    return `<ul>${li_items}</ul>`;
}

export function employeeManagerView(employees, selectedId, selectId) {
    if (!selectedId) return "";
    let values = employees.map(e => {
        return {
            text: e.name + " " + e.surname,
            value: e.id,
            selected: e.id === selectedId
        }
    });
    return `<span>${selectView(values, selectId)}</span>`;
}

export function selectView(values, selectId) {
    const values_html = values.map(v =>
        `<option value="${v.value}" 
         ${v.selected ? 'selected' : ''}>${v.text}</option>`
    ).join("");
    if (selectId) {
        return `<select id="${selectId}">${values_html}</select>`;
    } else {
        return `<select>${values_html}</select>`;
    }
}

export function addEmployeeUI() {
    let employeeFromUI = getEmployeeFromUI();
    let newEmployee = setEmployeeManager(employeeFromUI, getManagerIdFromUI());
    let newEmployees = addEmployee(getEmployees(), newEmployee);
    let html;
    if (!!newEmployees) {
        html = addEmployeeView(newEmployees, employeeFromUI);
    } else {
        html = addEmployeeView(getEmployees(), employeeFromUI);
    } 

    //showEmployees(getEmployees());
    document.getElementById(ADD_PANE).innerHTML = html;
    showEmployees(newEmployees);
    return newEmployees;
}

export function addEmployeeView(employees, employee) {
    let errors = errorView(employee);
    let html = `<h3>Добавление сотрудника</h3>
        <label for="name">Имя:</label>
        <input id="name" placeholder="Имя">
        <label for="surname">Фамилия:</label>
        <input id="surname" placeholder="Фамилия"></input>
        <label for="managerSelect">Менеджер:</label>
        ${employeeManagerView(employees, 1, "managerSelect")}`;
    if (!!errors) {
        html += `${errors}`;
    }
    html += `<p>
                <button onclick="setEmployees(addEmployeeUI())" id="addEmployeeButton">
                Добавить сотрудника</button>
            </p>`;
    return html;
}

function getEmployeeFromUI() {
    return {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value
    };
}

function getManagerIdFromUI() {
    return document.getElementById("managerSelect").value;
}

function errorView(employee) {
    let errorHTML = "";
    if (employee.name == "") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
        //document.getElementById("name").style.backgroundColor = '#FFEEEE';
    }
    if (employee.surname == "") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
        //document.getElementById("surname").style.backgroundColor = '#FFEEEE';
    }
    if (errorHTML.length !== 0) {
        return `<div id="addEmployeeFormErrorMessage">${errorHTML}</div>`;
    } else {
        return errorHTML;
    }
}

export function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(getEmployees());
    //removeOption(document.getElementById("managerSelect"), id);
}

function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue == option.value) option.selected = true;
        select.appendChild(option);
    }
}

function addOption(select, val) {
    const option = document.createElement("option");
    option.text = val.text;
    option.value = val.value;
    select.appendChild(option);
}

function removeOption(select, id) {
    for (opt of select.childNodes) {
        if (id === Number(opt.value)) {
            select.removeChild(opt);
            break;
        }
    }
}

function getEmployeesOptions() {
    let options = [];
    for (let e of getEmployees()) {
        options.push({ text: e.name + ' ' + e.surname, value: e.id });
    }
    return options;
}

export function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    const managerRef = document.getElementById("managerSearch").value;

    const employees = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}

/**
 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */
export function openTab(evt, id) {
    // Определяем переменные
    var i, tabcontent, tablinks;

    // Получаем все элементы с class="tabcontent" и прячем их
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Получаем все элементы с class="tablinks" и удаляем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Показываем текущий таб и добавляем класс "active"
    // на кнопку, которая открывает этот таб
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}

function assignSendOnEnter(paneId, buttonId) {
    let allInput = document.querySelectorAll("#" + paneId + " input");
    for (let input of allInput) {
        input.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector("#" + buttonId + " button").click();
            }
        });
    }
}


export function runUI() {
    showEmployees(getEmployees());
    //fillSelect(document.getElementById("managerSelect"),
    //    getEmployeesOptions());
    document.getElementById("searchButton").click();
    assignSendOnEnter("searchPane", "searchEmployeesButton");
    assignSendOnEnter("addPane", "addEmployeeButton");
}
