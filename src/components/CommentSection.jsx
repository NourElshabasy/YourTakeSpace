import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../client";

import Comment from "./Comment";

const CommentSection = ({ postId, submitSuccess, setSubmitSuccess }) => {
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const fetchComments = async () => {
    let query = supabase.from("Comments").select("*").eq("post_id", postId);

    if (sortBy === "newest") {
      query = query.order("created_at", { ascending: false });
    } else if (sortBy === "popular") {
      query = query.order("upvoteCount", { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
      setComments([]);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  }, [postId, sortBy, submitSuccess]);

  return (
    <div>
      <div className="sort-buttons">
        <p>Order by: </p>
        <button
          onClick={() => setSortBy("newest")}
          disabled={sortBy === "newest"}
          className="order-buttons"
        >
          Newest
        </button>
        <button
          onClick={() => setSortBy("popular")}
          disabled={sortBy === "popular"}
          className="order-buttons"
        >
          Most Popular
        </button>
        <p>
          {comments.length} Comment{comments.length !== 1 && "s"}
        </p>
      </div>
      {comments &&
        comments.length > 0 &&
        [...comments].map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            created_at={comment.created_at}
            comment={comment.comment}
            upvoteCount={comment.upvoteCount}
            onDelete={fetchComments}
            onUpdate={fetchComments}
          />
        ))}
    </div>
  );
};

export default CommentSection;
