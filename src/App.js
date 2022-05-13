import classes from './App.module.scss'
import Table from "./components/Table/Table";
import Section from "./containers/section";

function App() {
  return (
    <div className={classes.App}>
        <Section>
            <Table/>
        </Section>
    </div>
  );
}

export default App;
