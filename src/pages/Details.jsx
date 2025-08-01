import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";
import { Link } from "react-router-dom";

import "./Details.css";

import deleteIcon from "../assets/delete.png";
import deleteClicked from "../assets/deleteClicked.png";
import edit from "../assets/edit.png";
import editClicked from "../assets/editClicked.png";
import upvote from "../assets/upvote.png";
import upvoteClicked from "../assets/upvoteClicked.png";
import downvote from "../assets/downvote.png";
import downvoteClicked from "../assets/downvoteClicked.png";

import NavBar from "../components/NavBar";
import CreateComment from "../components/CreateComment";
import CommentSection from "../components/CommentSection";

const Details = ({ setQuery }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    created_at: "",
    title: "",
    content: "",
    imgURL: "",
    upvoteCount: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single(); // get exactly one

      if (error) {
        console.error("Error fetching crewmate:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const [isHovered, setIsHovered] = useState(null);

  const handleUpvote = async () => {
    const newCount = Number(post.upvoteCount) + 1;

    // Update Supabase
    const { data, error } = await supabase
      .from("Posts")
      .update({ upvoteCount: newCount })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update upvote:", error);
    } else {
      setPost(data); // refresh local state with updated data
    }
  };

  const handleDownvote = async () => {
    const newCount = Number(post.upvoteCount) - 1;

    // Update Supabase
    const { data, error } = await supabase
      .from("Posts")
      .update({ upvoteCount: newCount })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update upvote:", error);
    } else {
      setPost(data); // refresh local state with updated data
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();
    await supabase.from("Comments").delete().eq("post_id", id);
    await supabase.from("Posts").delete().eq("id", id);

    window.location = "/";
  };

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

  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(upvote);
    preloadImage(upvoteClicked);
    preloadImage(downvote);
    preloadImage(downvoteClicked);
    preloadImage(edit);
    preloadImage(editClicked);
    preloadImage(deleteIcon);
    preloadImage(deleteClicked);

    setQuery(""); // Clear query on page mount
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!post.imgURL || post.imgURL.trim() === "") {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = post.imgURL;
  }, [post.imgURL]);

  return (
    <>
      <NavBar setQuery={setQuery} />
      <div className="page detail-page">
        <div className="details">
          <p className="post-time">{formatTimeAgo(post.created_at)}</p>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          {imageLoaded && (
            <img className="post-image" src={post.imgURL} alt="img" />
          )}

          <div className="upvote-edit-delete-flex">
            <div className="upvote">
              <img
                src={isHovered === "upvote" ? upvoteClicked : upvote}
                alt="upvote"
                className="upvoteIcon"
                onClick={handleUpvote}
                onMouseEnter={() => setIsHovered("upvote")}
                onMouseLeave={() => setIsHovered(null)}
              />
              <p className="post-upvotes">{post.upvoteCount} upvotes</p>
              <img
                src={isHovered === "downvote" ? downvoteClicked : downvote}
                alt="downvote"
                className="downvoteIcon"
                onClick={handleDownvote}
                onMouseEnter={() => setIsHovered("downvote")}
                onMouseLeave={() => setIsHovered(null)}
              />
            </div>
            <div className="options">
              <Link to={"/edit/" + id}>
                <div
                  className="option"
                  onMouseEnter={() => setIsHovered("edit")}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <img
                    src={isHovered === "edit" ? editClicked : edit}
                    alt="edit"
                    className="editIcon"
                  />
                </div>
              </Link>
              <div
                className="option"
                onMouseEnter={() => setIsHovered("delete")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img
                  src={isHovered === "delete" ? deleteClicked : deleteIcon}
                  alt="delete"
                  className="deleteIcon"
                  onClick={deletePost}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="comments">
          <h3>Comments</h3>
          <CreateComment postId={post.id} setSubmitSuccess={setSubmitSuccess} />
          <CommentSection postId={id} submitSuccess={submitSuccess} setSubmitSuccess={setSubmitSuccess}/>
        </div>
      </div>
    </>
  );
};

export default Details;
