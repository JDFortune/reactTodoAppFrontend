import Header from './Header';
import TodoItem from './TodoItem';
import { Todo, ModalState, SelectedList } from '../types';
import { createTableClickHandler } from '../utils/main_utils';
import TodoUtility from '../utils/TodoList';
import plusImage from '../images/plus.png'

interface ContentProp {
  title: string;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedList>>;
  todoList: TodoUtility;
}

const Content: React.FC<ContentProp>= ({
  title,
  setModalState,
  setTodos,
  setSelectedList,
  todoList
}) => {

  const displayNewForm = () => {
    setModalState({todoId: null, visible: true, form: TodoUtility.initialForm()});
  }

  const sortedTodos = TodoUtility.sortListByCompletion(todoList.activeList);

  return(
    <div id="items" >
        <Header title={title} todoCount={todoList.activeList.length} />

        <main>
          <label
            htmlFor="new_item" 
            onClick={displayNewForm}>
            <img src={plusImage} alt="Add Todo Item" />
            <h2>Add new to do</h2>
          </label>

          <table cellSpacing="0">
            <tbody
              onClick={createTableClickHandler(todoList, setModalState, setSelectedList, setTodos)}
            >
              {sortedTodos.map(todo => <TodoItem todo={todo} key={`todo_${todo.id}`}/> )}
            </tbody>
          </table>
        </main>

      </div>
  );
}

export default Content;