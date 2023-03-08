import { useState } from "react";
import s from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchWord === "") {
      return;
    }
    onSubmit(searchWord);
    setSearchWord("");
  };
  const handleNameChange = (e) => {
    setSearchWord(e.currentTarget.value);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          onChange={handleNameChange}
          className={s.SearchFormInput}
          value={searchWord}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
