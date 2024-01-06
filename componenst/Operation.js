import React, {useState} from "react";
const Operation = ({operation, onSubmit, onDelete, taskStatus}) => {
    const [operationState, changeState] = useState("normal")
    const [form,setForm] = useState("")
    const handleSubmit = (e) => {
        if (typeof onSubmit === "function"){
            onSubmit(e, operation, form , changeState);
            setForm("");
        }
    }
    const deleteOperation = () => {
        if(typeof onDelete === "function") {
            onDelete(operation.id)
        }
    }
    return (
        <div>
            {operationState === "normal" && operation.timeSpent === 0 && <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    {operation.description}
                </div>
                <div>
                    {taskStatus === "open" && <button className="btn btn-outline-success btn-sm mr-2" onClick={()=>changeState("addTime")}>
                        Add time
                        <i className="fas fa-clock ml-1"></i>
                    </button>}

                    <button onClick={deleteOperation} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>
                </div>
            </li>}

            {operationState === "addTime" && <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
            {operation.description}
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-group input-group-sm">
                <input type="number"
                       className="form-control"
                       placeholder="Spent time in minutes"
                       style={{width: "12rem"}}
                       value = {form}
                       onChange={(e)=>setForm(Number(e.target.value))}
                    />
                <div className="input-group-append">
                    <button className="btn btn-outline-success" type="submit"><i className="fas fa-save"></i></button>
                    <button className="btn btn-outline-dark" onClick={()=>changeState("normal")}><i className="fas fa-times false"></i></button>
                </div>
            </div>
        </form>
    </li>}
            {operationState === "normal" && operation.timeSpent > 0 && <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
            {operation.description}
            <span className="badge badge-success badge-pill ml-2">
            {operation.timeSpent <60 && operation.timeSpent + "min"}
                {operation.timeSpent >= 60 && Math.floor(operation.timeSpent/60 )+ "h " + operation.timeSpent%60 + "min"}
          </span>
        </div>
        <div>
            {taskStatus === "open" && <button className="btn btn-outline-success btn-sm mr-2" onClick={()=>changeState("addTime")} >
                Add time
                <i className="fas fa-clock ml-1"></i>
            </button>}
            <button onClick={deleteOperation} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>
        </div>
    </li>}
        </div>
    )
}
export default Operation;