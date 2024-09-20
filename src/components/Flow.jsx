import { useState } from "react"
import { Task } from "./Task"
import '../../public/styles/components/flow.css'

export const Flow = () => {
    const [tasks, setTasks] = useState([
        { 'id': 0, 'name': 'Init git repository', 'tool': 'git', 'row': 1, 'position': 1 },
        { 'id': 1, 'name': 'Create container', 'tool': 'docker', 'row': 1, 'position': 2 },
        { 'id': 2, 'name': 'Design header', 'tool': 'react', 'row': 1, 'position': 3 },
        { 'id': 3, 'name': 'Add api connection', 'tool': 'node', 'row': 1, 'position': 4 },
        { 'id': 4, 'name': 'Apply stylesheet', 'tool': 'css', 'row': 1, 'position': 5 },
        { 'id': 5, 'name': 'HTTP request', 'tool': 'php', 'row': 2, 'position': 1 },
        { 'id': 6, 'name': 'ipconfig', 'tool': 'cli', 'row': 2, 'position': 2 },
        { 'id': 7, 'name': 'fetch', 'tool': 'js', 'row': 2, 'position': 3 }
    ])

    return (
        <div className="flow">
            <div className="flow__container">
                <div className="flow__container__grid flow-grid">
                    {
                        tasks.map((task, index) =>
                            <Task name={task.name} tool={task.tool}
                                position={task.position} row={task.row} key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}