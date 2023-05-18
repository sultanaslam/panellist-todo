import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Todo {
  title: string;
  description: string;
  isDone: boolean;
  id: number;
}
export interface TodosState {
  data: Todo[];
}

const initialState: TodosState = {
  data: [
    {
      description: 'Setup a react application with TS, MaterialUI and Redux',
      id: 1,
      isDone: true,
      title: 'App Setup'
    },
    {
      description: 'Users should be able to add, edit, and delete tasks.',
      id: 2,
      isDone: false,
      title: 'Todo CRUD'
    },
    {
      description: 'Tasks should be displayed in a Material-UI table.',
      id: 3,
      isDone: false,
      title: 'Visual'
    },
    {
      description:
        'Users should be able to filter tasks by completion status using Material-UI tabs.',
      id: 4,
      isDone: false,
      title: 'Filter Tabs'
    },
    {
      description: 'The application should use Redux for state management.',
      id: 5,
      isDone: true,
      title: 'State Management'
    },
    {
      description:
        'The application should have a responsive and visually appealing design.',
      id: 6,
      isDone: false,
      title: 'Responsive'
    },
    {
      description:
        'A GitHub repository containing the source code for the application.',
      id: 7,
      isDone: false,
      title: 'GIT'
    }
  ]
};

export const todosSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.data.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
    updateTodoStatus: (state, action: PayloadAction<number>) => {
      state.data = state.data.map(todo => {
        if (todo.id === action.payload) todo.isDone = !todo.isDone;
        return todo;
      });
    }
  }
});

export const { addTodo, removeTodo, updateTodoStatus } = todosSlice.actions;

export const todos = (state: RootState) => state.todos;

export default todosSlice.reducer;
