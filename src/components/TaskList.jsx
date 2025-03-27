import React from "react";
import styled from "styled-components";
const Container = styled.div`
width:200px;
border:2px solid green;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:50px;
padding:20px;
border-radius:20px;
`
const List = styled.div`
width:300px;
border:1px solid green;
height:100%;
`
const MainContainer = styled.div`
display:flex;
width:500px;
height:100%;
padding:20px;
border:3px  double purple;
margin:auto;
gap:50px;
`
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.tasks = savedTasks;
    this.inputValue = "";
  }
  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  handleChange = (e) => {
    this.inputValue = e.target.value;
  };

  reset = () => {
    this.tasks = [];
    this.saveToLocalStorage();
    this.forceUpdate();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const taskText = this.inputValue.trim();

    if (taskText) {
      this.tasks.push({ id: Date.now(), text: taskText });
      this.saveToLocalStorage();
      this.forceUpdate();
    }

    e.target.reset();
    this.inputValue = "";
  };

  deleteTask = (id) => {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToLocalStorage();
    this.forceUpdate();
  };

  render() {
    return (
      <MainContainer>
      <form onSubmit={this.handleSubmit}>
      <Container>
        <h3>Додайте список</h3>
        <input type="text" id="inputTask" onChange={this.handleChange} />
        <button type="submit">Додати</button>
        <button type="button" onClick={this.reset}>Очистити список</button>
        </Container>
      </form>
     <List>
      <ul>
        <h1>Список завданнь</h1>
          {this.tasks.map(task => (
            <li key={task.id}>
              {task.text}{" "}
              <button type="button" onClick={() => this.deleteTask(task.id)}>Видалити</button>
            </li>
          ))}
        </ul>
  </List>
  </MainContainer>
    );
  }
}

export default TaskList;