import { Todo } from '../types';
import TodoUtility from '../utils/TodoList';
import trashImage from '../images/trash.png'

const TodoItem: React.FC<{todo: Todo}> = ({todo}) => {
  const handleChecked = () => {}; // This will never run;

  return (
    <tr data-id={todo.id}>
      <td className="list_item">
        <input
          type="checkbox"
          name={`item_${todo.id}`}
          id={`item_${todo.id}`}
          checked={todo.completed}
          onChange={handleChecked}
          />
        <span className="check"></span>
        <label htmlFor={`item_${todo.id}`} className='edit'>
          {todo.title} - {TodoUtility.formatDate(todo.month, todo.year)}
        </label>
      </td>
      <td className="delete"><img src={trashImage} alt="Delete"/></td>
    </tr>
  );
};

export default TodoItem;