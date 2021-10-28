import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {
  // const [todos, setTodos] = useState(['Todo 1','Todo 2'])
  // const [todos, setTodos] = useState([{id: 1, name: 'Todo 1', complete: false}])
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // Grab first stored set
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Update localstorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Toggle individual complete status
  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    // Break if empty
    if (name === '') return
    // Array spread new value
    // Start with dummy ID and then talk about uuid
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    // Clears input field
    todoNameRef.current.value = null
  }

  const handleClearTodos = () => {
    // Copy over new ones with a filter
    const newTodos = todos.filter(todo => !todo.complete)
    // Setter
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
