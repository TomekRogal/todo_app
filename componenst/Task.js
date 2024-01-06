import React, {useEffect, useState} from "react";
import {API_KEY, API_URL} from "../js/constants";
import {getOperations} from "../js/operations";
import Operation from "./Operation";
const Task = ({task,refreshApp}) => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [showForm, changeShow] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [form,setForm] = useState({
        description:"",
        timeSpent: 0
    })
    const [allOperations, setOperations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSuccess(null);
            setError(null);
            const response = await fetch(`${API_URL}/tasks/${task.id}/operations`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (data.error) {
                setError("Error while executing operation");
            } else {
                setSuccess("operation added");
                setForm({
                    description:"",
                    timeSpent: 0
                })
                changeShow(false)
                setRefresh(prev => !prev)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    const onSubmit = async (e,operation,form,changeState) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/operations/${operation.id}`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"PUT",
                body: JSON.stringify({
                    description: operation.description,
                    timeSpent: operation.timeSpent + form
                })
            });
            const data = await response.json();
            if (data.error) {
                console.log("error")
            } else {
                setRefresh(prev => !prev)
                changeState("normal")
            }
        } catch (err) {
            console.log(err);
        }
    }
    const deleteTask = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"DELETE"
            });
            const data = await response.json();
            if (data.error) {
                throw new Error("error!");
            }
            refreshApp(prev=>!prev)
        } catch (err) {
            console.log(err);
        }
    }
    const finishTask = async () => {
        try {
            const response = await fetch(`${API_URL}/tasks/${task.id}`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"PUT",
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status: "closed"
                })

            });
            const data = await response.json();
            if (data.error) {
                console.log("error")
            }
            refreshApp(prev => !prev)

        } catch (err) {
            console.log(err);
        }
    }
    const deleteOperation = async (id) => {
        try {
            const response = await fetch(`${API_URL}/operations/${id}`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"DELETE"
            });
            const data = await response.json();
            if (data.error) {
                throw new Error("error");
            }
            setRefresh(prev=>!prev)
        } catch (err) {
            console.log(err);
        }
    }
    console.log(task.status + task.title)
    useEffect(() => {
        getOperations(task.id, (data)=>setOperations(data));
    },[refresh] );
    return(
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{task.title}</h5>
                    <h6 className="card-subtitle text-muted">{task.description}</h6>
                </div>

                    <div>
                        {task.status === "open" &&
                        <button className="btn btn-info btn-sm mr-2" onClick={()=>changeShow(true)}>
                            Add operation
                            <i className="fas fa-plus-circle ml-1"></i>
                        </button>}
                        {task.status === "open" &&<button onClick={finishTask} className="btn btn-dark btn-sm mr-2">
                            Finish
                            <i className="fas fa-archive ml-1"></i>
                        </button>}

                        {allOperations.length === 0 && <button onClick={deleteTask} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>}
                    </div>


            </div>
            {showForm && <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        value={form.description}
                        type="text"
                        className="form-control"
                        name="description"
                        placeholder="Description"/>
                    <button className="btn btn-info">
                        Add operation
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </div>

                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>}
            <ul className="list-group list-group-flush">
                {allOperations.map(ele=>(
                    <Operation key={ele.id} operation={ele} onSubmit={onSubmit} onDelete={deleteOperation} taskStatus={task.status}/>
                ))}
            </ul>
        </section>
    )
}
export default Task;