import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../client";
import "./CreateComment.css";

const CreateComment = ({ postId, setSubmitSuccess }) => {
  const [comment, setComment] = useState("");
  

  const createComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      alert("Comment must not be empty!");
      return;
    }

    await supabase
      .from("Comments")
      .insert({
        post_id: postId,
        comment: comment,
      })
      .select();

    setComment("");
    setSubmitSuccess(true);
  };
  return (
    <div className="create-comment">
      <form>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={2}
          className="comment-input"
        ></textarea>
      </form>
      <button className="post-comment-button"onClick={createComment}>POST</button>
    </div>
  );
};

export default CreateComment;
