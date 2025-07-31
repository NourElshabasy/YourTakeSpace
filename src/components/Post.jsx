import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diff = Math.floor((now - postDate) / 1000); // seconds

    if (diff < 60) return "Posted just now";
    if (diff < 3600) return `Posted ${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `Posted ${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `Posted ${Math.floor(diff / 86400)} days ago`;
    if (diff < 2419200)
      return `Posted ${Math.floor(diff / 604800)} week${
        Math.floor(diff / 604800) > 1 ? "s" : ""
      } ago`;

    return `Posted on ${postDate.toLocaleDateString()}`;
  };
  return (
    <Link to={"/details/" + props.id}>
      <div className="post">
        <p className="post-time">{formatTimeAgo(props.created_at)}</p>
        <h3 className="post-title">{props.title}</h3>
        <p className="post-upvotes">{props.upvoteCount} upvotes</p>
      </div>
    </Link>
  );
};

export default Post;
