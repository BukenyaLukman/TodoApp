import React, { Component } from 'react'
import './App.css';
import TodoBanner from './Components/TodoBanner';
import TodoCreator from './Components/TodoCreator';
import TodoRow from './Components/TodoRow';
import VisibilityControl  from "./Components/VisibilityControl";


export class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       userName:"Bukenya",
       todoItems: [{action:"Buy Flowers for Juliana", done: false},
                   {action:"Read Data structures and algorithms", done: false},
                   {action:"Build Machine Learning Model", done: true},
                   {action:"Call Juliana", done: false}],
        showCompleted: true
    }
  }

  updateNewitemValue = (event)=>{
    this.setState({newItemText:event.target.value});
  }

  createNewTodo = (task)=>{
    if(!this.state.todoItems.find(item => item.action === task)){
      this.setState({
        todoItems: [...this.state.todoItems,
            {action: task, done : false}]
      }, () => localStorage.setItem("todos",JSON.stringify(this.state)));
    }
  }

  toggleTodo = (todo) => this.setState({
    todoItems:this.state.todoItems.map(item => item.action === todo.action 
      ? { ...item, done: !item.done} : item)
  });

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map(item =>
    <TodoRow key={ item.action } item={ item } 
      callback={ this.toggleTodo } />
  );


  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data)
        : {
            userName : "Bukenya",
            todoItems: [{action: "Buy Flowers For Juliana", done: false},
                        {action: "Read Data structures and algorithms", done: false},
                        {action: "Build Machine Learning Model", done: true},
                        {action: "Call Juliana", done: false }],
            showCompleted: true
        });
  }
  
  changeStateData = ()=>{
    this.setState({
      userName: this.state.userName === "Bukenya" ? "Bob" : "Bukenya"
    })
  }
  render = () => 
    
      <div>
          <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
          <div className="container-fluid">
            <TodoCreator callback={this.createNewTodo}/>
            <table className="table table-striped table-bordered">
                <thead>
                  <tr><th>Description</th><th>Done</th></tr>
                </thead>
                <tbody>
                  { this.todoTableRows(false)}
                </tbody>
            </table>
            <div className="bg-secondary text-white text-center p-2">
                <VisibilityControl description="Completed Tasks"
                  isChecked={this.state.showCompleted}
                  callback={ (checked) =>
                    this.setState({ showCompleted: checked })}/>
            </div>
            { this.state.showCompleted && 
              <table className="table table-striped table-bordered">
                <thead>
                    <tr><th>Description</th><th>Done</th></tr>
                </thead>
              <tbody>{ this.todoTableRows(true)}</tbody>
              </table>
              }
          </div>
      </div>
    
  
}

export default App;
