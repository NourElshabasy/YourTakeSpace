import React from "react";
import { useState } from "react";
import "./Comment.css";
import deleteIcon from "../assets/delete.png";
import deleteClicked from "../assets/deleteClicked.png";
import upvote from "../assets/upvote.png";
import upvoteClicked from "../assets/upvoteClicked.png";
import downvote from "../assets/downvote.png";
import downvoteClicked from "../assets/downvoteClicked.png";
import { supabase } from "../../client";
import { useEffect } from "react";

const Comment = (props) => {
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

  const [isHovered, setIsHovered] = useState(null);
  const deleteComment = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from("Comments")
      .delete()
      .eq("id", props.id);

    if (error) {
      console.error("Error deleting comment:", error);
    } else {
      props.onDelete?.(); // refresh comments
    }
  };

  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(upvote);
    preloadImage(upvoteClicked);
    preloadImage(downvote);
    preloadImage(downvoteClicked);
    preloadImage(deleteIcon);
    preloadImage(deleteClicked);

  }, []);

  const handleUpvote = async () => {
    const newCount = Number(props.upvoteCount) + 1;

    // Update Supabase
    const { data, error } = await supabase
      .from("Comments")
      .update({ upvoteCount: newCount })
      .eq("id", props.id)
      .select()
      .single();

    if (error) {
      console.error("Downvote failed:", error);
    } else {
      props.onUpdate?.(); // trigger refresh
    }
  };

  const handleDownvote = async () => {
    const newCount = Number(props.upvoteCount) - 1;

    // Update Supabase
    const { data, error } = await supabase
      .from("Comments")
      .update({ upvoteCount: newCount })
      .eq("id", props.id)
      .select()
      .single();

    if (error) {
      console.error("Downvote failed:", error);
    } else {
      props.onUpdate?.(); // trigger refresh
    }
  };
  return (
    <div className="comment">
      <div className="comment-content">
        <p className="the-comment">{props.comment}</p>
        <div
          className="option-comment"
          onMouseEnter={() => setIsHovered("delete")}
          onMouseLeave={() => setIsHovered(null)}
        >
          <img
            src={isHovered === "delete" ? deleteClicked : deleteIcon}
            alt="delete"
            className="deleteIcon-comment"
            onClick={deleteComment}
          />
        </div>
      </div>

      <div className="comment-info">
        <div className="upvote">
          <img
            src={isHovered === "upvote" ? upvoteClicked : upvote}
            alt="upvote"
            className="upvoteIcon-comment"
            onClick={handleUpvote}
            onMouseEnter={() => setIsHovered("upvote")}
            onMouseLeave={() => setIsHovered(null)}
          />
          <p>{props.upvoteCount} upvotes</p>
          <img
            src={isHovered === "downvote" ? downvoteClicked : downvote}
            alt="downvote"
            className="downvoteIcon-comment"
            onClick={handleDownvote}
            onMouseEnter={() => setIsHovered("downvote")}
            onMouseLeave={() => setIsHovered(null)}
          />
        </div>

        <p>{formatTimeAgo(props.created_at)}</p>
      </div>
    </div>
  );
};

export default Comment;
