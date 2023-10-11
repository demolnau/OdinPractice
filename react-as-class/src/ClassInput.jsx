import React, { Component } from "react";
import { v4 as uuid} from 'uuid';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { task: "mow the yard", id: uuid()}, 
        { task: "Work on Odin Projects", id: uuid()},
        { task: "feed the cat", id: uuid()},
      ],
      inputVal: "",
      id: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.countTodos = this.countTodos.bind(this);
  }


  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({task: state.inputVal, id: uuid() }),
      inputVal: "",
      id:""
    }));
  }

  deleteTask(id){
   this.setState((prevState) => ({
    todos: prevState.todos.filter(item => item.id!==id),
    inputVal: "",
    id:""
  }));
  }

  countTodos(){
    console.log(this.state.todos.length)
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>{todo.task}
            <button onClick={() => this.deleteTask(todo.id)}>Delete</button>
            </li> 
          ))}
        </ul>
        <button onClick={this.countTodos}>Count</button>
      </section>
    );
  }
}

export default ClassInput;