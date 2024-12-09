import './assets/styles/reset.css';
import './assets/styles/todo_v2.css';
import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import Content from './components/Content';
import Nav from './components/Nav'
import todoService from './services/todoService';
import { findMainTabAndSetActive, isHTMLElement} from './utils/main_utils';
import { Todo, ModalState, SelectedList } from './types';
import TodoUtility from './utils/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedList, setSelectedList] = useState<SelectedList>({
    title:'All Todos',
    completed: false
  });
  const [modalState, setModalState] = useState<ModalState>({visible: false, todoId: null, form: TodoUtility.initialForm()})

  useEffect(() => {
    todoService
      .getAll()
      .then(todoData => {
        setTodos(todoData)
      });

    document.getElementById('all_header')!.classList.add('active');
  }, []);

  const todoList = new TodoUtility(todos);
  todoList.setActiveList(selectedList);
  
  const handleChangeList = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHTMLElement(e.target)) return null;
    const target = e.target;

    const title = findMainTabAndSetActive(target);
    if (!title) return null;

    const section = target.closest('section');
    if (!section) return null;

    const filterCriteria = section.id === 'all' ? 'all' : 'completed';

    setSelectedList({title, completed: (filterCriteria === 'completed') })
  }

  return (
    <>
      <Nav todoList={todoList} handleChangeList={handleChangeList}/>
      <Content
        title={selectedList.title}
        setModalState={setModalState}
        setTodos={setTodos}
        setSelectedList={setSelectedList}
        todoList={todoList}
      />
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        setTodos={setTodos}
        setSelectedList={setSelectedList}
        todoList={todoList}
      />
    </>
  )
}

export default App
