import React, { useEffect, useState } from "react";
// import axios from "axios";
import { instance } from "../api";
import Blog from "./Blog";
const UserBlogs = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userId");
    const sendRequest = async () => {
        const res = await instance
            .get(`/api/blog/user/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    }, []);
    console.log(user);
    return (
        <div>
            {" "}
            {user &&
                user.blogs &&
                user.blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        key={index}
                        isUser={true}
                        activity={blog.activity}
                        date={blog.date}
                        duration={blog.duration}
                        calories={blog.calories}
                        note={blog.note}
                        userName={user.name}
                    />
                ))}
        </div>
    );
};

export default UserBlogs;
