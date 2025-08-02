import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!props.imgURL || props.imgURL.trim() === "") {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = props.imgURL;
  }, [props.imgURL]);
  return (
    <Link to={"/details/" + props.id}>
      <div className="post">
        <div className="row">
          <p className="post-time">{formatTimeAgo(props.created_at)}</p>
          {props.edited && imageLoaded && <p className="post-edited">edited</p>}
        </div>
        <div className="post-title-div">
          <h3 className="post-title">{props.title}</h3>
        </div>
        {props.showDetails && <p className="post-content">{props.content}</p>}
        {props.showDetails && imageLoaded && (
          <img className="post-image" src={props.imgURL} alt="img" />
        )}

        <p className="post-upvotes">{props.upvoteCount} upvotes</p>
      </div>
    </Link>
  );
};

export default Post;
