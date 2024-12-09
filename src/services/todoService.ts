import axios from 'axios';
import { NewTodo, Todo } from '../types';
import { parseResponseObject } from '../utils/main_utils';

const baseUrl = 'http://localhost:3000/api/todos';



export const getAll = (): Promise<Todo[]> => {
  return axios
    .get(baseUrl)
    .then(({data}: {data: Todo[]}) => {
      data = data.map(parseResponseObject);
      return data;
    });
};

export const getTodo = (id: number): Promise<Todo> => {
  return axios
    .get(baseUrl + `/${id}`)
    .then(({data}: {data: Todo}) => {
      data = parseResponseObject(data);
      return data;
    });
};

export const create = (todo: NewTodo): Promise<Todo> => {
  return axios
    .post(baseUrl, todo)
    .then(({data}: {data: Todo}) => {
      data = parseResponseObject(data);
      return data
    })
    .catch(error => { throw new Error(error.message) });
};

export const updateTodo = (id: number, newTodo: Todo): Promise<Todo> => {
  return axios
    .put(baseUrl + `/${id}`, newTodo)
    .then(({data}: {data: Todo}) => {
      data = parseResponseObject(data);
      return data
    })
    .catch(error => { throw new Error(error.message) });
};

export const deleteTodo = (id: number) => {
  return axios
    .delete(baseUrl + `/${id}`)
    .then(response => response)
    .catch(error => console.error(error.message))
}

export default {
  getAll,
  getTodo,
  create,
  updateTodo,
  deleteTodo
}