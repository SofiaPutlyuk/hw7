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
padding:30px;
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
class TaskLists extends React.Component {
    state = {
        tasks: [],
        currentTask: ""
    }
    componentDidMount() {
        const savedTask = JSON.parse(localStorage.getItem("Task")) || [];
        this.setState({
            tasks: savedTask
        })
    }
    handleTask = ({ target: { value } }) => {
        this.setState({
            currentTask: value
        })
    }
    handleAddTask = () => {
        const { tasks, currentTask } = this.state
        if (!currentTask.trim()) return;
        const updateTask = [...tasks, currentTask]
        this.setState({
            tasks: updateTask,
            currentTask: ""
        })
        localStorage.setItem("Task", JSON.stringify(updateTask))
    }
    handleDeleteTask = (taskDeleted) => {
        const { tasks } = this.state
        const updateTask = tasks.filter(task => task !== taskDeleted)
        this.setState({
            tasks: updateTask
        })
        localStorage.setItem("Task", JSON.stringify(updateTask))
    }

    render() {
        const { currentTask, tasks } = this.state
        return (
            <MainContainer>
                <form>
                    <Container>
                    <h3>Додайте список</h3>
                    <label>
                        <input type="text" value={currentTask} onChange={this.handleTask} />
                        <button type="button" onClick={this.handleAddTask}>Add</button>
                    </label>
                    </Container>
                </form>
                <List>
                <h1>Список завданнь</h1>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index}>
                                {task}{""}
                                <button onClick={() => this.handleDeleteTask(task)}>Delete</button>
                            </li>
                        ))

                    ) : (
                        <p>Немає завданнь</p>
                    )
                    }
                </List>
            </MainContainer>
        )
    }
}
export default TaskLists;