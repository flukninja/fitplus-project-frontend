import { instance } from "../api";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    console.log(id);
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const fetchDetails = async () => {
        const res = await instance
            .get(`/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog);
            setInputs({
                activity: data.blog.activity,
                date: data.blog.date,
                duration: data.blog.duration,
                calories: data.blog.calories,
                note: data.blog.note,
            });
        });
    }, [id]);
    const sendRequest = async () => {
        const res = await instance
            .put(`/api/blog/update/${id}`, {
                activity: inputs.activity,
                date: inputs.date,
                duration: inputs.duration,
                calories: inputs.calories,
                note: inputs.note,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    };
    console.log(blog);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/myBlogs/"));
    };

    return (
        <div>
            {inputs && (
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
                                    <option value="Weight-training">Weight-training</option>
                                    <option value="Zumba">Zumba</option>
                                    <option value="Yoga">Yoga</option>
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
            )}
        </div>
    );
};

export default BlogDetail;
