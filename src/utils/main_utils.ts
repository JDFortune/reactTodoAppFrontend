import { SyntheticEvent } from 'react';
import todoService, { deleteTodo, updateTodo } from '../services/todoService';
import { ModalForm, ModalState, SelectedList, Todo } from '../types';
import TodoUtility from './TodoList';

export const parseId = (element: HTMLElement): number | null => {
  const row = element.closest('tr');
  if (row) {
    return Number(row.dataset.id);
  } else {
    return null;
  }
}

export const isHTMLElement = (val: unknown): val is HTMLElement => {
  return val instanceof HTMLElement;
}

export const parseResponseObject = (todo: Todo): Todo => {
  todo.day = todo.day.trim();
  todo.month = todo.month.trim();
  todo.year = todo.year.trim();
  todo.description = todo.description.trim();

  return todo;
}

export const findTodo = (todos: Todo[], id: number | null): Todo | null => {
  let todo;
  if (id) {
    todo = todos.find(todo => todo.id === id);
  }

  return todo || null;
}

// The next two functions handle a range of clicks on the nav bar to determine
// The appropriate element to set as active (for highlighting) and which text to
// return which is used to render the active selected list of todos.
export const getTitle = (target: HTMLElement) => {
  if (!target.dataset.title || target.tagName === 'HEADER') {
    let temp = target.closest('header');
    if (isHTMLElement(temp)) {
      target = temp;
    }
    target.classList.add('active');
    temp = target.querySelector('dt');
    if (isHTMLElement(temp)) target = temp;
    return target.textContent;
  } else {
    target.classList.add('active');
    const temp = target.querySelector('time');
    if (isHTMLElement(temp)) target = temp;
    return target.textContent;
  }
}

export const findMainTabAndSetActive = (target: HTMLElement) => {
  if(!isHTMLElement(target) || target.id === 'sidebar') return null;
  
  document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));

  if (target.tagName === 'SECTION' || (target.tagName === 'DIV' && target.id === 'sidebar')) {
    return null;
  }

  if (target.tagName === 'DIV') {
    const temp =  target.querySelector('dl');
    if (isHTMLElement(temp)) target = temp;
  } else {
    const temp = target.closest('dl');
    if (isHTMLElement(temp)) target = temp;
  }
  return getTitle(target);
}

export const formatFormValues = (form: ModalForm): void => {
  form.day = form.day === 'Day' ? '  ' : form.day;
  form.month = form.month === 'Month' ? '  ' : form.month;
  form.year = form.year === 'Year' ? '    ' : form.year;
  form.description = form.description === '' ? ' ' : form.description;
}

//  Content.tsx Click Handler Creater
export const createTableClickHandler = (
  todoList: TodoUtility,
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>,
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedList>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
 return (
    (event: React.MouseEvent) => {
      event.preventDefault();

      if (!isHTMLElement(event.target)) return null;
      
      const target = event.target.closest('td, label');
      if (isHTMLElement(target)) {
        const id = parseId(target);
        const todo = findTodo(todoList.activeList, id);
        if (!id || !todo) return null;
        
        switch (target.className) {
          case 'delete': {
            deleteTodo(id).then(() => {
              setTodos((prev) => prev.filter(todo => todo.id !== id))

              if (todoList.activeList.length === 1) setSelectedList((prev) => {
                const title = prev.completed ? 'Completed' : 'All Todos';
                return {...prev,  title};
              });
            });
            break;
          }
          case 'edit': {
            setModalState({
              todoId: id,
              visible: true,
              form: TodoUtility.formDataFromTodo(todo)
            });
            break;
          }
          case 'list_item': {
            updateTodo(id, {...todo, completed: !todo.completed})
              .then((updatedTodo: Todo) => {
                setTodos(todoList.todos.map(t => t.id === id ? updatedTodo : t));
              });
          }
        }
      }
    }
 )
}


// Modal Form Submission Handler creator
export const createSubmitFormHandler = (
  todo: Todo | null,
  modalState: ModalState,
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedList>>,
  todoList: TodoUtility
) => {
  return (
    (e: SyntheticEvent) => {
       e.preventDefault();
   
       const form: ModalForm = Object.assign({}, modalState.form);
       formatFormValues(form);
   
       let submitter: unknown;
       if (e.nativeEvent instanceof SubmitEvent) submitter = e.nativeEvent.submitter;
       if (!(submitter instanceof HTMLElement)) return null;
   
       const tagName: string = submitter.tagName;
   
       if (todo) {
         const newObject: Todo = tagName === 'INPUT'
           ? {...todo, ...form}
           : {...todo, completed: true};
   
         todoService
           .updateTodo(todo.id, newObject)
           .then(newObj => setTodos((curr) => {
            
            if (todoList.activeList.length === 1) setSelectedList((prev) => {
              const title = prev.completed ? 'Completed' : 'All Todos';
              return {...prev,  title};
            });
            return curr.map(t => todo.id === t.id ? newObj : t)
       }));
         } else {
           if (submitter.tagName === 'INPUT') {
             todoService
             .create({...modalState.form, completed: false})
             .then(newObj => {
               setTodos((curr) => [...curr, newObj]);
               setSelectedList({title: 'All Todos', completed: false})
             });
         } else {
           alert('Cannot mark Todo Complete before it is created.');
           return;
         }
       }
   
       setModalState({todoId: null, visible: false, form: TodoUtility.initialForm()})
     }
  ); 
}