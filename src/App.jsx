import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";

import "./App.css";

import NavBar from "./components/NavBar";
import Post from "./components/Post";

function App(props) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase.from("Posts").select("*");

      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "popular") {
        query = query.order("upvoteCount", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [sortBy, props]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(props.query?.toLowerCase() || "")
  );

  return (
    <>
      <NavBar setQuery={props.setQuery} />
      <div className="page">
        <div className="posts">
          <div className="number-post-flex">
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
            </div>
            <p>
              {posts.length} Post{posts.length !== 1 && "s"}
            </p>
          </div>
          {posts && posts.length > 0
            ? [...filteredPosts].map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  created_at={post.created_at}
                  title={post.title}
                  upvoteCount={post.upvoteCount}
                  edited={post.edited}
                />
              ))
            : !loading && <h2 className="no-posts">{"No posts Yet 😞"}</h2>}
        </div>
      </div>
    </>
  );
}

export default App;
