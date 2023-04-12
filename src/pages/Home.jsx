import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import { Navigate } from "react-router-dom";
import { Login } from "./Login/index.jsx";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts } from "../redux/slices/posts.js";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [searchQuery, setSearchQuery] = React.useState("");

  const navigate = useNavigate();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostLoading = posts.status === "loading";

  const searchedPosts = React.useMemo(() => {
    return posts.items.filter((post) => post.surname.includes(searchQuery));
  }, [searchQuery, posts.items]);

  React.useEffect(() => {}, [searchQuery]);

  React.useEffect(() => {
    dispatch(fetchPosts());
    console.log(posts);
  }, []);
  if (!userData) {
    navigate("/login");
  }
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">поиск</InputGroup.Text>
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="gjb"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : searchedPosts).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                key={index}
                title={obj.name}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.place}
                commentsCount={obj.price}
                tags={["react", "fun", "typescript"]}
                name={obj.name}
                surname={obj.surname}
                patronimyc={obj.patronimyc}
                seniority={obj.seniority}
                seriesPasport={obj.seriesPasport}
                numberPasport={obj.seriesPasport}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item></Grid>
      </Grid>
    </>
  );
};
