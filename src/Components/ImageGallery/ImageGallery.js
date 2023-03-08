import { useState, useEffect } from "react";
// import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

import Button from "../Button/Button";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ searchWord }) {
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [galaryItems, setGalaryItems] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState("idle");

  const API_KEY = "33933659-7e72dabc750f764111807e746";

  const handleBtnIncrement = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (searchWord === "") return;

    setPage(1);
    setGalaryItems([]);
    fetchGalary();
  }, [searchWord]);

  useEffect(() => {
    if (searchWord === "") return;

    fetchGalary();
  }, [page]);

  const fetchGalary = () => {
    setStatus("pending");
    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
      .then((res) => res.json())
      .then((res) => {
        if (page === 1) {
          setGalaryItems(res.hits);

          setTotalHits(res.totalHits);
          setStatus("resolved");
          res.totalHits === 0
            ? toast.error("По вашому запиту нічого не знайдено", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            : toast(`Ми знайшли ${res.totalHits} картинок по вашому запиту`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        } else {
          setGalaryItems((prevState) => [...prevState, ...res.hits]);
          setStatus("resolved");
        }
      })
      .catch((rej) => setError(rej));
  };

  if (status === "pending") {
    return galaryItems ? (
      <>
        <ul className={s.ImageGallery}>
          {galaryItems.map((item) => (
            <ImageGalleryItem key={item.id} data={item} />
          ))}
        </ul>
        <ThreeDots wrapperClass={s.loader} />
      </>
    ) : (
      <ThreeDots wrapperClass={s.loader} />
    );
  }
  if (status === "resolved") {
    return (
      <>
        <ul className={s.ImageGallery}>
          {galaryItems.map((item) => (
            <ImageGalleryItem key={item.id} data={item} />
          ))}
        </ul>
        {totalHits - galaryItems.length > 1 && (
          <Button increment={handleBtnIncrement} />
        )}
      </>
    );
  }
}
