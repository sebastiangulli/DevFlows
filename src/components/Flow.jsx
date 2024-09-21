import { useEffect, useState } from "react"
import { Task } from "./Task"
import '../../public/styles/components/flow.css'

export const Flow = () => {
    const [rowsNumber, setRowsNumber] = useState(0)
    const [lastTasksIds, setLastTasksIds] = useState([])
    const [mergeTasks, setMergeTasks] = useState([])
    const [tasks, setTasks] = useState([
        { 'id': 0, 'name': 'Init git repository', 'tool': 'git', 'row': 1, 'position': 1, 'merge': null },
        { 'id': 1, 'name': 'Create container', 'tool': 'docker', 'row': 1, 'position': 2, 'merge': null },
        { 'id': 2, 'name': 'Design header', 'tool': 'react', 'row': 1, 'position': 3, 'merge': null },
        { 'id': 3, 'name': 'Add api connection', 'tool': 'node', 'row': 1, 'position': 4, 'merge': null },
        { 'id': 4, 'name': 'Apply stylesheet', 'tool': 'css', 'row': 1, 'position': 5, 'merge': null },
        { 'id': 8, 'name': 'Create Fork', 'tool': 'github', 'row': 1, 'position': 6, 'merge': null },
        { 'id': 5, 'name': 'HTTP request', 'tool': 'php', 'row': 2, 'position': 1, 'merge': null },
        { 'id': 6, 'name': 'ipconfig', 'tool': 'cli', 'row': 2, 'position': 2, 'merge': null },
        { 'id': 7, 'name': 'fetch', 'tool': 'js', 'row': 2, 'position': 3, 'merge': 1 }
    ])

    const measureDiff = () => mergeTasks.map(task1 => task1.position - tasks.filter(task2 => task2.id === task1.merge)[0].id)[0]
    const getMergePosition = () => mergeTasks.map(task1 => tasks.filter(task2 => task2.id === task1.merge)[0].position)[0]

    useEffect(() => {
        setMergeTasks(tasks.filter(task => task.merge))
        setRowsNumber(tasks.reduce((lastRow, task) => task.row > lastRow ? task.row : lastRow, 0))
        for (let i = 1; i <= rowsNumber; i++) {
            let tasksRow = tasks.filter(task => task.row === i)
            let lastPosition = tasksRow.reduce((lastTask, task) => task.position > lastTask ? task.position : lastTask, 0)
            setLastTasksIds(array => [...array, tasksRow.map(task => task.position === lastPosition && task.id)[tasksRow.length - 1]])
        }
    }, [rowsNumber, tasks])

    return (
        <div className="flow">
            <div className="flow__container">
                <div className="flow__container__grid flow-grid">
                    {
                        tasks.map((task, index) =>
                            <Task merge={task.merge} name={task.name} tool={task.tool}
                                isLastTask={lastTasksIds.includes(task.id) ? true : false}
                                column={task.row === 1 & task.position >= getMergePosition() ? task.position + measureDiff() : task.position}
                                row={task.row} key={index} lineWidth={task.row === 1 & task.position === getMergePosition() - 1 && 125 + 234 * measureDiff()}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}