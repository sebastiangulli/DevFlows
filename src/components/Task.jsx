import { Icon } from "./Icon"
import { toolPaths } from "../icons/toolPaths"

export const Task = ({ name, tool }) => {
    return (
        <div className="flow__container__grid__task">
            <span className="flow__container__grid__task__name">
                {name}
            </span>
            <div className="flow__container__grid__task__box">
                <Icon className={'flow__container__grid__task__box__icon'}>
                    {toolPaths[tool]}
                </Icon>
            </div>
        </div>
    )
}