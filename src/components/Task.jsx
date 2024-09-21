import { Icon } from "./Icon"
import { toolPaths } from "../icons/toolPaths"
import '../../public/styles/components/task.css'

export const Task = ({ name, tool, column, row, isLastTask, merge, lineWidth }) => {
    return (
        <div className={`flow__container__grid__task task ${merge ? 'merge' : ''} ${isLastTask ? 'last-task' : ''}`}
            style={{ gridColumn: column, gridRow: row, '--line-width': `${lineWidth ? lineWidth : 150}px`, '--line-width-merge': `${lineWidth ? lineWidth : 75}px`}}>
            <span className="flow__container__grid__task__name task-name">
                {name}
            </span>
            <div className="flow__container__grid__task__box task-box centred-element">
                <Icon className={'flow__container__grid__task__box__icon task-icon'}>
                    {toolPaths[tool]}
                </Icon>
            </div>
        </div>
    )
}