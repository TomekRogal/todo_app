import React, {useState} from "react";
import {API_KEY, API_URL} from "../js/constants";

const Form = ({setRefresh}) => {
    const [form,setForm] = useState({
        title:"",
        description:"",
        status:"open"
    })
    const [success, setSuccess] = React.useState(null);
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                headers: {
                    Authorization: API_KEY,
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (data.error) {
                setError("Error while executing tasks");
            } else {
                setSuccess("Task added");
                typeof setRefresh === 'function' && setRefresh();
                setForm({
                    title:"",
                    description:"",
                    status:"open"
                })
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
    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            onChange={handleChange}
                            value={form.title}
                            type="text"
                               className="form-control"
                               name="title"
                               placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input
                            onChange={handleChange}
                            value = {form.description}
                            type="text"
                               className="form-control"
                               name="description"
                               placeholder="Description"/>
                    </div>
                    <button className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
            </div>
        </div>
    )

}
export default Form;