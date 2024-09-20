import { useState } from "react"
import { toolIcons } from "../icons/toolIcons"

export const Flow = () => {
    const [tasks, setTasks] = useState([
        {'id': 0, 'name': 'Init git repository', 'tool': 'git', 'branch': 'main', 'position': 1},
        {'id': 1, 'name': 'Create container', 'tool': 'docker', 'branch': 'main', 'position': 2},
        {'id': 2, 'name': 'Design header', 'tool': 'react', 'branch': 'main', 'position': 3},
        {'id': 3, 'name': 'Add api connection', 'tool': 'node', 'branch': 'main', 'position': 4},
        {'id': 4, 'name': 'Apply stylesheet', 'tool': 'css', 'branch': 'main', 'position': 5}
    ])

    return (
        <div className="flow">
            <div className="flow__container">

            </div>
        </div>
    )
}