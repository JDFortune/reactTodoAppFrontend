import TodoUtility from "./utils/TodoList";

export interface Todo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

export type NewTodo = Omit<Todo, 'id'>;

export interface ModalForm {
  title: string;
  day: string;
  month: string;
  year: string;
  description: string;
}

export interface ModalState {
  visible: boolean;
  todoId: number | null;
  form: ModalForm;
}

export interface ModalProps {
  modalState: ModalState
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedList>>;
  todoList: TodoUtility;
}

export interface YearsObj {
  [year: string]: string[];
}

export interface SelectedList {
  title: string;
  completed: boolean;
}

export interface TodoListType {
  todos: Todo[];
  parseList: (list: Todo[]) => Todo[];
  parseTodo: (todo: Todo) => Todo;
}

export interface SortedTodos {
  [due: string]: Todo[];
}

export interface GroupedTodosByDate {
  all: { [due: string]: Todo[]};
  completed: { [due: string]: Todo[]};
}
