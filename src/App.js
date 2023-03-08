import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="App">
      <Searchbar onSubmit={setSearchWord} />
      <ImageGallery searchWord={searchWord} />
      <ToastContainer />
    </div>
  );
}

export default App;
