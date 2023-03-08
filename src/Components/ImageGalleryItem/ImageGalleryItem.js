import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ data }) {
  const [activeModalImg, setActiveModalImg] = useState(null);

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          onClick={() => {
            setActiveModalImg({
              largeImg: data.largeImageURL,
              altImg: data.tags,
            });
          }}
          className={s.ImageGalleryItemImage}
          src={data.webformatURL}
          alt={data.tags}
        />
        {activeModalImg && (
          <Modal
            closeModal={() => {
              setActiveModalImg(null);
            }}
          >
            <img src={activeModalImg.largeImg} alt={activeModalImg.altImg} />
          </Modal>
        )}
      </li>
    </>
  );
}
