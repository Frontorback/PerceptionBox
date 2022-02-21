import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToDetail,
  addToLiked,
  delFromLiked,
  getCharacters,
} from "../Redux/characterSlice";
import { RootState } from "../Redux/store";
import styles from "./styles.module.scss";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useDispatch();
  const { characters, loading, error, liked } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(getCharacters(currentPage));
  }, [dispatch, currentPage]);
  const items = characters
    .slice()
    .filter((n) => n.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {error ? 
        <h1>{error}</h1>
       : 
          <div className={styles.Home}>
            <h2>Current Page: {currentPage}</h2>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />

            {loading && <h1>Loading...</h1>}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items &&
                items.map((k) => (
                  <div key={k.id} className={styles.item}>
                    <Link
                      to="/Detail"
                      onClick={() => dispatch(addToDetail(k.id))}
                    >
                      <span>{k.name} =</span>
                      <span>{k.status}</span>
                    </Link>
                    <button
                      className={
                        liked.includes(k.id) ? styles.activeBtn : styles.btn
                      }
                      onClick={() => dispatch(addToLiked(k.id))}
                    >
                      LIKE
                    </button>
                    <button
                      className={styles.btn}
                      onClick={() => dispatch(delFromLiked(k.id))}
                    >
                      DISLIKE
                    </button>
                  </div>
                ))}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              prev page
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              next page
            </button>
          </div>
      }
    </>
  );
};

export default Home;
