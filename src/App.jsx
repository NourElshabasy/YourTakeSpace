import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";

import "./App.css";

import NavBar from "./components/NavBar";
import Post from "./components/Post";

function App(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Posts").select();

      setPosts(data);

      setLoading(false);
    };
    fetchPosts();
  }, [props]);

  return (
    <>
      <NavBar />
      <div className="page">
        <div className="posts">
          {posts && posts.length > 0 ? (
            [...posts]
              .reverse()
              .map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  created_at={post.created_at}
                  title={post.title}
                  upvoteCount={post.upvoteCount}
                />
              ))
          ) : (
             !loading && <h2 className="no-posts">{"No posts Yet 😞"}</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
