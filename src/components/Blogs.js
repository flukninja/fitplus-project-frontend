import React, { useEffect, useState } from "react";
import { instance } from "../api";
// import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const sendRequest = async () => {
        const res = await instance
            .get("/api/blog")
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    
    useEffect(() => {
        sendRequest().then((data) => setBlogs(data.blogs));
    }, []);
    console.log(blogs);

    return (
        <div>
            {blogs &&
                blogs.map((blog, index) => (
                    <Blog
                        id={blog._id}
                        isUser={localStorage.getItem("userId") === blog.user._id}
                        activity={blog.activity}
                        date={blog.date}
                        duration={blog.duration}
                        calories={blog.calories}
                        note={blog.note}
                        userName={blog.user.name}
                    />
                ))}
        </div>
    );
};

export default Blogs;
