import {
  DeleteOutlineOutlined,
  ReplayOutlined,
  TaskAlt
} from '@mui/icons-material';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Chip
} from '@mui/material';
import { memo } from 'react';

import { useAppDispatch } from 'redux/hooks';
import { Todo, removeTodo, updateTodoStatus } from 'redux/reducers/todo';

const List = ({ list }: { list: Todo[] }) => {
  const dispatch = useAppDispatch();
  return (
    <TableContainer component={Paper}>
      <Table size='small' sx={{ minWidth: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell align='right'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow
              key={row.title + row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Box alignItems='center' display='flex'>
                  <TaskAlt
                    color={row.isDone ? 'success' : 'disabled'}
                    fontSize='small'
                  />
                  <Box ml={2}>
                    <b>{row.title}</b>
                    <Box>{row.description}</Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  color={row.isDone ? 'success' : 'default'}
                  label={row.isDone ? 'Complete' : 'Pending'}
                  size='small'
                  sx={{ width: 75 }}
                />
              </TableCell>
              <TableCell align='right'>
                <Box display='flex' justifyContent='flex-end'>
                  <DeleteOutlineOutlined
                    color='error'
                    fontSize='small'
                    onClick={() => dispatch(removeTodo(row.id))}
                    sx={{ cursor: 'pointer' }}
                  />
                  <ReplayOutlined
                    fontSize='small'
                    onClick={() => dispatch(updateTodoStatus(row.id))}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(List);
