import React, { useState } from 'react';

const TaskBox = (props) => {
    let { data, deleteTask,changeStatus} = props;
    const [updateTaskVal, setUpdatedTaskList] = useState([]);
    const changeDropStatus = (e) =>{
        changeStatus(e.target.value,data.name)
    }
    

    return (
        <div className='taskBox'>
            <div>
                <button className='nakedBtn' onClick={()=>deleteTask(data.name)}>DELETE</button>
                <div>
                   TASK :  {data.name}
                </div>
                <select  onChange={(e)=>changeDropStatus(e,data.name)} id='changeStatus'>
                    <option value="" disabled selected>Change Status</option>
                    <option key='p1' value="todoTask">To-do Task</option>
                    <option key='p2' value="progressTask">Progress Task</option>
                    <option key='p3' value="completedTask">Completed Task</option>
                </select>
            </div>
        </div>
    )
}

export default TaskBox;