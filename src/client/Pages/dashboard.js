import React, { useState, useEffect } from 'react';
import '../../assets/css/dashboard.css';
import TaskBox from '../component/taskBox';
import SearchBar from '../component/searchBar';

const Dashboard = () => {
    const [searchValue, setRealTimeSearchVale] = useState('');
    const [createTaskData, setCreateTaskData] = useState({ add_new_task_name: '', type: '' });
    const [taskList, setAdTodoTask] = useState([])
    const [updatedTaskList, setUpdatedTaskList] = useState([]);
    
    const nameSet = (e) => {
        setCreateTaskData({ ...createTaskData, add_new_task_name: e.target.value });
    }

    useEffect(() => {
        let task = localStorage.getItem('taskList')
        if (task) {
            task = JSON.parse(task)
            setAdTodoTask(task)
            setUpdatedTaskList(task)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
    }, [updatedTaskList])

    const createTask = () => {
        const { type, add_new_task_name } = createTaskData;
        let new_task = {
            name: add_new_task_name,
            type: type
        }
        new_task = [...taskList, new_task]
        if (add_new_task_name != '')
            setAdTodoTask(new_task)
        setUpdatedTaskList(new_task)
        setCreateTaskData({ add_new_task_name: '', type: 'todoTask' })
    }


    const deleteTask = (name) => {
        let filteredData = taskList.filter(function (i) { return i.name != name })
        setAdTodoTask(filteredData)
        setUpdatedTaskList(filteredData)

    }

    const setSearch = (v) => {
        setRealTimeSearchVale(v)
        let tosearchString = v.toLocaleLowerCase();
        let datafiltered = taskList.filter(function (i) {
            if (
                i.name && i.name.includes(tosearchString)
            ) {
                return i
            }
        })
        setAdTodoTask(datafiltered)
        if (v == '') {
            let task = localStorage.getItem('taskList')
            if (task) {
                task = JSON.parse(task)

                setAdTodoTask(task)
            }
        }
    }

    const handletasktype = (e) => {
        setCreateTaskData({ ...createTaskData, type: e.target.value });
    }
    const { type, add_new_task_name } = createTaskData;

    const changeStatus = (currType, Taskname) => {
        console.log(currType, Taskname)
        let filteredData = taskList.filter(function (i) { return i.name == Taskname })
        filteredData[0].type = currType
        setAdTodoTask([...new Set(taskList, filteredData)])
        setUpdatedTaskList([...new Set(taskList, filteredData)])
    }


    return (
        <div>
            <header className='header'>
                <div style={{ marginLeft: '2rem' }}>
                    <SearchBar setSearch={setSearch} keyword={searchValue} />
                    <div style={{ display: 'flex',flexWrap:'wrap' }}>
                        <div className='mAuto'>
                            <input type='text' name='add_new_task_name' placeholder='Task Name' onChange={(e) => nameSet(e)} value={add_new_task_name} />
                        </div>
                        <div className='mAuto'>
                            <select value={type} onChange={(e) => handletasktype(e)}>
                                <option value="" disabled selected>Select Status</option>
                                <option key='p1' value="todoTask">To-do Task</option>
                                <option key='p2' value="progressTask">Progress Task</option>
                                <option key='p3' value="completedTask">Completed Task</option>
                            </select>
                        </div>
                        <button className='btn' onClick={createTask}>Add</button>
                    </div>
                </div>
            </header>
            <section>

                <div className='taskManager' id='taskManager'>
                    <div className='prorityBox' id='prio1'>
                        <h3>To Do {taskList.filter(function (i) { return i.type == 'todoTask' }).length}</h3>
                        {taskList && taskList.length > 0 && taskList.map(i => {
                            if (i.type == 'todoTask') {
                                return <TaskBox data={i} key={i.name} deleteTask={deleteTask} changeStatus={changeStatus} />
                            }
                        })
                        }
                    </div>
                    <div className='prorityBox' id='prio2'>
                        <h3>In Progress {taskList.filter(function (i) { return i.type == 'progressTask' }).length}</h3>
                        {taskList && taskList.length > 0 && taskList.map(i => {
                            if (i.type == 'progressTask') {
                                return <TaskBox data={i} key={i.name} deleteTask={deleteTask} changeStatus={changeStatus} />
                            }
                        })
                        }
                    </div>
                    <div className='prorityBox' id='prio3'>
                        <h3>Complete {taskList.filter(function (i) { return i.type == 'completedTask' }).length}</h3>
                        {taskList && taskList.length > 0 && taskList.map(i => {
                            if (i.type == 'completedTask') {
                                return <TaskBox data={i} key={i.name} deleteTask={deleteTask} changeStatus={changeStatus} />
                            }
                        })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;