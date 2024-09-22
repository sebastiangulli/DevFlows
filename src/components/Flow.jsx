import { useEffect, useState } from "react"
import { Task } from "./Task"
import '../../public/styles/components/flow.css'

export const Flow = () => {
    const [rowsNumber, setRowsNumber] = useState(0)
    const [lastTasksIds, setLastTasksIds] = useState([])
    const [translateRules, setTranslateRules] = useState([])

    const [tasks, setTasks] = useState([
        { 'id': 0, 'name': 'Init git repository', 'tool': 'git', 'row': 1, 'position': 1, 'merge': null },
        { 'id': 1, 'name': 'Create container', 'tool': 'docker', 'row': 1, 'position': 2, 'merge': null },
        { 'id': 2, 'name': 'Design header', 'tool': 'react', 'row': 1, 'position': 3, 'merge': null },
        { 'id': 3, 'name': 'Add api connection', 'tool': 'node', 'row': 1, 'position': 4, 'merge': null },
        { 'id': 4, 'name': 'Apply stylesheet', 'tool': 'css', 'row': 1, 'position': 5, 'merge': null },
        { 'id': 8, 'name': 'Create Fork', 'tool': 'github', 'row': 1, 'position': 6, 'merge': null },
        { 'id': 5, 'name': 'HTTP request', 'tool': 'php', 'row': 2, 'position': 1, 'merge': null },
        { 'id': 6, 'name': 'ipconfig', 'tool': 'cli', 'row': 2, 'position': 2, 'merge': null },
        { 'id': 7, 'name': 'fetch', 'tool': 'js', 'row': 2, 'position': 3, 'merge': 3 }
    ])

    const defineTranslationRules = () => {
        let mergedTasks = tasks.filter(task1 => tasks.map(task2 => task2.merge).includes(task1.id))
        mergedTasks.map(task => {
            let mergeFrom = tasks.filter(item => item.merge === task.id)
            let lastMergePosition = mergeFrom.reduce((lastItem, item) => item.position > lastItem ? item.position : lastItem, 1)
            let positionDiff = task.position - lastMergePosition
            if (positionDiff < 1) setTranslateRules(prev => [...prev, { 'row': task.row, 'rules': [{'startPostion': task.position, 'translate': Math.abs(positionDiff) + 1}]}])
        })
    }

    const getTaskById = id => tasks.find(task => task.id === id)

    const getMergeInfo = task => {
        let task2 = tasks.find(taskMerge => taskMerge.id === task.merge)
        return {
            'from': { 'id': task.id, 'row': task.row, 'position': task.position },
            'to': { 'id': task2.id, 'row': task2.row, 'position': task2.position }
        }
    }

    const getMergeDiff = task => {
        let mergeInfo = getMergeInfo(task)
        let positionsDiff = mergeInfo.from.position - mergeInfo.to.position
        let rowsDiff = mergeInfo.from.row - mergeInfo.to.row
        return {
            'position': positionsDiff,
            'row': rowsDiff
        }
    }

    useEffect(() => {
        defineTranslationRules()
        setRowsNumber(tasks.reduce((lastRow, task) => task.row > lastRow ? task.row : lastRow, 0))
        for (let i = 1; i <= rowsNumber; i++) {
            let tasksRow = tasks.filter(task => task.row === i)
            let lastPosition = tasksRow.reduce((lastTask, task) => task.position > lastTask ? task.position : lastTask, 0)
            setLastTasksIds(array => [...array, tasksRow.map(task => task.position === lastPosition && task.id)[tasksRow.length - 1]])
        }
    }, [rowsNumber, tasks])

    const setTranslate = ({ row, position }) => {
        let rowRules = translateRules.find(rulesSet => rulesSet.row === row)
        if (rowRules) return rowRules.rules.reduce((translate, rule) => position >= rule.startPostion ? translate + rule.translate : translate, 0)
        else return 0
    }

    const setColumn = task => {
        let mergeTasks = tasks.filter(item => item.merge === task.id)
        if (mergeTasks.length) {
            let lastMergePosition = mergeTasks.reduce((lastItem, item) => item.position > lastItem ? item.position : lastItem, 1)
            if (task.position - lastMergePosition >= 1) return task.position + setTranslate(task)
            else return lastMergePosition + 1
        } else return task.position + setTranslate(task)
    }

    return (
        <div className="flow">
            <div className="flow__container">
                <div className="flow__container__grid flow-grid">
                    {
                        tasks.map((task, index) =>
                            <Task merge={task.merge} name={task.name} tool={task.tool}
                                isLastTask={lastTasksIds.includes(task.id) ? true : false}
                                column={setColumn(task)} row={task.row} key={index}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}