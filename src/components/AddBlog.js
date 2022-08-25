import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";
// import { instance } from "../api";

const AddBlog = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        activity: "",
        date: "",
        duration: "",
        calories: "",
        note: "",
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const sendRequest = async () => {
        const res = await axios
            .post("https://fitplus-backend.vercel.app/api/blog/add", {
                activity: inputs.activity,
                date: inputs.date,
                duration: inputs.duration,
                calories: inputs.calories,
                note: inputs.note,
                user: localStorage.getItem("userId"),
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/blogs"));
    };
    return (
        <div className="container">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>Add Activity</h1>
                    <div className="form-control">
                        <label>Activity</label>
                        <select
                            name="activity"
                            className="select-activity"
                            value={inputs.activity}
                            onChange={handleChange}
                        >
                            <option value="" />
                            <option value="Swimming">Swimming</option>
                            <option value="Running">Running</option>
                            <option value="Walking">Walking</option>
                            <option value="Situp">Sit-up</option>
                            <option value="Situp">Weight-trainingt</option>
                            <option value="Situp">Zumba</option>
                            <option value="Situp">Yoga</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Date & Time</label>
                        <input
                            name="date"
                            type="date"
                            value={inputs.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label>Duration(minute)</label>
                        <input
                            name="duration"
                            type="number"
                            value={inputs.duration}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                    <div className="form-control">
                        <label>Calories</label>
                        <input
                            name="calories"
                            type="number"
                            value={inputs.calories}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                    <div className="form-control">
                        <label>Note here!</label>
                        <textarea
                            id="textarea"
                            cols="60"
                            rows="5"
                            name="note"
                            value={inputs.note}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
