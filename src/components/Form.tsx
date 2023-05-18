import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { memo, useState } from 'react';

import { useAppDispatch } from 'redux/hooks';
import { Todo, addTodo } from 'redux/reducers/todo';

const Form = ({ onClose }: FormProps) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Todo>({
    description: '',
    id: Date.now(),
    isDone: false,
    title: ''
  });

  const addHandle = () => {
    dispatch(addTodo(data));
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Title'
          onChange={e => setData({ ...data, title: e.target.value })}
          size='small'
          sx={{ my: 1 }}
          value={data.title}
        />
        <TextField
          fullWidth
          multiline
          label='Description'
          maxRows={3}
          minRows={3}
          onChange={e => setData({ ...data, description: e.target.value })}
          size='small'
          sx={{ my: 1 }}
          value={data.description}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={addHandle}
          size='small'
          variant='contained'
        >
          Add
        </Button>
        <Button
          color='inherit'
          onClick={onClose}
          size='small'
          variant='contained'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(Form);

interface FormProps {
  onClose: () => void;
}
