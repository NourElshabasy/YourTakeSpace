import React, { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../client.js";
import "./Create.css";

import NavBar from "../components/NavBar";

const Create = ({ setQuery }) => {
  const [post, setPost] = useState({ title: "", content: "", imgURL: "" });

  useEffect(() => {
    setQuery(""); // Clear query on page mount
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!post.title.trim()) {
      alert("A title is required to create a post!");
      return;
    }

    await supabase
      .from("Posts")
      .insert({
        title: post.title,
        content: post.content,
        imgURL: post.imgURL,
      })
      .select();

    setPost({ title: "", content: "", imgURL: "" });
    window.location.href = "/";
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
              />
              <textarea
                className="content"
                type="text"
                name="content"
                placeholder="Content (Optional)"
                onChange={handleChange}
              ></textarea>
              <input
                className="imgURL"
                type="text"
                name="imgURL"
                placeholder="Image URL (Optional)"
                onChange={handleChange}
              />
            </div>
          </form>
          <button className="create-button" onClick={createPost}>
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
