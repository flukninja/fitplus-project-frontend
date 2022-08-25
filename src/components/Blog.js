import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { instance } from "../api";
import "./Blog.css";
const Blog = ({ activity, date, duration, calories, userName, note, isUser, id }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/myBlogs/${id}`);
    };
    const deleteRequest = async () => {
        const res = await axios
            .delete(`https://fitplus-backend.vercel.app/api/blog/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/blogs"));
    };
    return (
        <div>
            {" "}
            <Card className="card" sx={{ minWidth: 275 }}>
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditOutlineIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>
                )}
                <CardContent className="card-content">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Date: {date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                        Activity: {activity}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>Duration: {duration} minute</Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        Calories: {calories} cal
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        Note: {note}
                    </Typography>
                    <hr />
                    <Typography>Username: {userName}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Blog;
