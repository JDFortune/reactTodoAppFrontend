import { Todo, YearsObj, SortedTodos, SelectedList, ModalForm } from "../types";

export default class TodoUtility {
  todos: Todo[];
  todoGroups:  {
    all: { [due: string]: Todo[]};
    completed: { [due: string]: Todo[]};
  }
  activeList: Todo[];

  constructor(list: Todo[]) {
    this.todos = this.parseList(list);
    this.todoGroups = this.groupTodos();
    this.activeList = [];
  }

  completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  find(id: number | null): Todo | null {
    if (!id) return null;

    return this.activeList.find(todo => todo.id === id) || null;
  }

  filterCompletedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  groupTodos() {
    return {
      all: this.groupByDate('all'),
      completed: this.groupByDate('completed'),
    }
  }

  private groupByDate(status: 'all' | 'completed') {
    let tempTodos: Todo[] = this.todos;

    if (status === 'completed') {
      tempTodos = this.filterCompletedTodos();
    }
    
    if (tempTodos.length === 0) return {};

    const [sortedYears, isNoDue] = this.sortedArrayOfYearsAndBooleanNoDueDate(tempTodos)
    const yearKeysAndSortedMonths = this.monthsSortedByYearAsKey(tempTodos, sortedYears)
    return this.groupTodosByMonthYearKey(tempTodos, yearKeysAndSortedMonths, isNoDue)
  }

  private groupTodosByMonthYearKey(todos: Todo[], sortedStructure: YearsObj, isNoDue: boolean) {
    const todoDateGroupObj: SortedTodos = {};

    if (isNoDue) {
      todoDateGroupObj['No Due Date'] = [];
    }

    for (const year in sortedStructure) {
      const months: string[] = sortedStructure[year];
      months.forEach(month => {
        todoDateGroupObj[TodoUtility.formatDate(month, year)] = [];
      });
    }

    todos.forEach(todo => {
      const mmyy: string = TodoUtility.formatDate(todo.month, todo.year);
      todoDateGroupObj[mmyy].push(todo);
    });

    return todoDateGroupObj;
  }

  parseList(list: Todo[]) {
    return list.map(this.parseTodo);
  }

  parseTodo(todo: Todo) {
    todo.day = todo.day.trim();
    todo.month = todo.month.trim();
    todo.year = todo.year.trim();
    todo.description = todo.description.trim();

    return todo;
  }

  setActiveList({title, completed}: SelectedList) {
    switch (title) {
      case 'All Todos': {
        this.activeList =  this.todos;
        break;
      }
      case 'Completed': {
        this.activeList = this.completedTodos();
        break;
      }
      default: {
        const listClass = completed ? 'completed' : 'all';
        this.activeList =  this.todoGroups[listClass][title];
        break;
      }
    }
  }

  static initialForm() {
    return {
      title: '',
      day: '',
      month: '',
      year: '',
      description: '',
    }
  }

  static formDataFromTodo = (todo: Todo | null): ModalForm => {
    if (!todo) return this.initialForm();

    return {
      title: todo.title,
      day: todo.day,
      month: todo.month,
      year: todo.year,
      description: todo.description,
    }
  }

  static formatDate(month: string, year: string) {
    if (!month || !year) {
      return 'No Due Date';
    }

    return `${month}/${year.slice(-2)}`;
  }

  static parseResponseTodoObject = (todo: Todo): Todo => {
    todo.day = todo.day.trim();
    todo.month = todo.month.trim();
    todo.year = todo.year.trim();
    todo.description = todo.description.trim();

    return todo;
  }

  static sortListByCompletion = (todos: Todo[]) => {
    const complete: Todo[] = [];
    const incomplete: Todo[] = [];

    todos.forEach((todo: Todo) => {
      if (todo.completed) {
        complete.push(todo);
      } else {
        incomplete.push(todo);
      }
    });

    return [...incomplete, ...complete];
  }

  private monthsSortedByYearAsKey(todos: Todo[], years: string[]) {
    const unformattedYears: YearsObj = {};
    years.forEach(year => {
      if (!unformattedYears[year]) unformattedYears[year] = [];
    })

    todos.forEach((todo: Todo) => {
      if (!unformattedYears[todo.year].includes(todo.month)) {
        unformattedYears[todo.year].push(todo.month); 
      }
    });

    for (const year in unformattedYears) {
      unformattedYears[year].sort((a, b) => Number(a) - Number(b));
    }

    return unformattedYears;
  }

  private sortedArrayOfYearsAndBooleanNoDueDate(todos: Todo[]) {
    const years: string[] = []; 
    let isNoDue: boolean = false;

    todos.forEach(todo => {
      if (!todo.month || !todo.year) isNoDue = true;
      years.push(todo.year);
    });

    years.sort((a, b) => Number(a) - Number(b));

    return [years, isNoDue] as [string[], boolean];
  }
}
