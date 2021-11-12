import {removeEmployee} from './service.pure';
import {DATA} from './employees-json';
const employees = DATA.employees;

employeesRemoved135 = /*removeEmployee(employees, 135)*/;

test('removeEmployee', ()=>
    expect(removeEmployee(employees,135))
	.toEqual(employeesRemoved135)
);

