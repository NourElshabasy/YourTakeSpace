import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../client";
import "./Edit.css";

import NavBar from "../components/NavBar";

const Edit = ({ setQuery }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    title: "",
    content: "",
    imgURL: "",
    edited: false
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single(); // get exactly one

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async (event) => {
    event.preventDefault();

    if (!post.title.trim()) {
      alert("A title is required to create a post!");
      return;
    }

    await supabase
      .from("Posts")
      .update({
        title: post.title,
        content: post.content,
        imgURL: post.imgURL,
        edited: true
      })
      .eq("id", id);

    window.location = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <NavBar setQuery={setQuery} />
      <div className="page center-page">
        <div className="create">
          <form>
            <div className="create-post">
              <input
                className="title"
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={post.title}
              />
              <textarea
                className="content"
                type="text"
                name="content"
                placeholder="Content (Optional)"
                onChange={handleChange}
                value={post.content}
              ></textarea>
              <input
                className="imgURL"
                type="text"
                name="imgURL"
                placeholder="Image URL (Optional)"
                value={post.imgURL}
                onChange={handleChange}
              />
            </div>
          </form>
          <button className="create-button" onClick={updatePost}>
            Update Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;
