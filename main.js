import { runUI, addEmployeeUI, openTab, searchEmployeeUI, removeEmployeeUI } from './employees/ui';
import { setEmployees } from './employees/service';
import './style.css';
import {Employee} from './model/Employee';

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.removeEmployeeUI = removeEmployeeUI;
window.setEmployees = setEmployees;

window.addEventListener("load", runUI);
