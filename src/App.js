import React from 'react';
import classes from './App.module.scss';
import Table from './components/Table/Table';
import Section from './containers/section';
import AssignmentList from './components/AssignmentList/AssignmentList';

function App() {
  return (
    <div className={classes.App}>
      <AssignmentList />
      <Section>
        <Table />
      </Section>
    </div>
  );
}

export default App;
