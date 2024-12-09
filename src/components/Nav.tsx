import TodoUtility from '../utils/TodoList';

interface NavProps {
  todoList: TodoUtility;
  handleChangeList: (e: React.MouseEvent) => void;
}

const Nav: React.FC<NavProps> = ({todoList, handleChangeList}) => {
  const allTodos = todoList.todoGroups.all;
  const completedTodos = todoList.todoGroups.completed;
  
  return (
    <>
      <input type="checkbox" id="sidebar_toggle"/>
      <div id="sidebar" 
        onClick={handleChangeList}
      >
        <section id="all">
          <div id="all_todos">
            <header data-title="All Todos" data-total="{{todos.length}}" id="all_header">
              <dl>
              <dt>All Todos</dt>
              <dd>{todoList.todos.length}</dd>
              </dl>
            </header>
          </div>
          <article id="all_lists">
          {Object.keys(allTodos).map(key => {
            return (
              <dl key={key} data-title={key} data-total={allTodos[key].length}>
                <dt><time>{key}</time></dt>
                <dd>{allTodos[key].length}</dd>
              </dl>
            );
          })}
          </article>
        </section>

        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <header data-title="Completed" data-total="{{done.length}}" id="all_done_header">
              <dl>
                <dt>Completed</dt>
                <dd>{todoList.todos.filter(t => t.completed).length}</dd>
              </dl>
            </header>
          </div>
          <article id="completed_lists">
          {Object.keys(completedTodos).map(key => {
            return (
              <dl key={`completed_${key}`} data-title={`completed_${key}`} data-total={completedTodos[key].length}>
                <dt><time>{key}</time></dt>
                <dd>{completedTodos[key].length}</dd>
              </dl>
            );
          })}
          </article>
        </section>
      </div>
    </>
  )
}

export default Nav