import { DATA } from './employees-json';

function sumSalaryInDep(dep) {
    return DATA.employees
         .filter(e=>e.department===dep)
	     .map(e=>e.salary)
        .reduce((a,b)=>a+b);
}

function avgSalaryInDep(dep) {
    let amount = DATA.employees
        .filter(e=>e.department === dep)
        .length;
    return DATA.employees
        .filter(e=>e.department === dep)
        .map(e=>e.salary)
        .reduce((a,b)=>(a+b))/amount;
}

function maxSalaryInDep(dep) {
    return Math.max(
        DATA.employees
            .filter(e=>e.department === dep)
            .map(e=>e.salary));
}

function depWithMaxSalary() {
    let deps = [... new Set(DATA.employees.map(e=>e.department))];
    let depMax, avgMax=0;
    deps.forEach(dep => {
        let avg = avgSalaryInDep(dep);
        if (avgMax < avg) {
            avgMax = avg;
            depMax = dep;
        }
    })
    return depMax;
}

function depEmployees(dep) {
    return DATA.employees.filter(e => e.department === dep);
}

function employeesWithSalaryMoreThan(salary) {
    return DATA.employees.filter(e => e.salary > salary);
}