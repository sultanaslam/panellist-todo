import { SyntheticEvent, memo, useMemo, useState } from 'react';
import { Box, Button, Chip, Grid, Typography, Tab, Tabs } from '@mui/material';
import { Add } from '@mui/icons-material';

import Form from './Form';
import List from './List';
import { todos } from 'redux/reducers/todo';
import { useAppSelector } from 'redux/hooks';

const Todos = () => {
  const [value, setValue] = useState(0);
  const [isOpenForm, setForm] = useState(false);
  const { data } = useAppSelector(todos);

  const completed = useMemo(() => data.filter(({ isDone }) => isDone), [data]);
  const pending = useMemo(() => data.filter(({ isDone }) => !isDone), [data]);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container alignItems='flex-end' justifyContent='space-between'>
        <Typography component='h1' variant='h3'>
          Todos
        </Typography>
        <Button
          onClick={() => setForm(true)}
          startIcon={<Add />}
          variant='contained'
        >
          Add New Todo
        </Button>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label='basic tabs example'
          onChange={handleChange}
          value={value}
        >
          <Tab
            label={
              <TabButton
                count={data.length}
                isActive={value === 0}
                label='All Todos'
              />
            }
          />
          <Tab
            label={
              <TabButton
                count={completed.length}
                isActive={value === 1}
                label='Completed Todos'
              />
            }
          />
          <Tab
            label={
              <TabButton
                count={pending.length}
                isActive={value === 2}
                label='Pending Todos'
              />
            }
          />
        </Tabs>
      </Box>
      <TabPanel index={0} value={value}>
        <List list={data} />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <List list={completed} />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <List list={pending} />
      </TabPanel>

      {isOpenForm && <Form onClose={() => setForm(false)} />}
    </Box>
  );
};

export default memo(Todos);

const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <div
      aria-labelledby={`tab-${index}`}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      role='tabpanel'
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const TabButton = ({ count, isActive, label }: TabButtonProps) => (
  <Box alignItems='center' display='flex'>
    {label}
    <Chip
      color={isActive ? 'primary' : 'default'}
      label={count}
      size='small'
      sx={{ margin: 1 }}
    />
  </Box>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabButtonProps {
  count: number;
  isActive: boolean;
  label: string;
}
