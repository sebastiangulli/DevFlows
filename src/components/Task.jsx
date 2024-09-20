import { Icon } from "./Icon"
import { toolPaths } from "../icons/toolPaths"
import '../../public/styles/components/task.css'

export const Task = ({ name, tool }) => {
    return (
        <div className="flow__container__grid__task task">
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