import { Input, Select, Textarea } from "components";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { useBackLocation } from "global";
import { useState } from "react";
import { categories } from "../../../utils/constants";

export default function ProductAdd() {
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();
  const backLocation = useBackLocation();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState({});
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    axios
      .post("products/add", {
        name,
        title,
        description,
        stock: Number(stock),
        category: category.value,
        img: image,
        price: Number(price),
        isActive: true,
      })
      .then((res) => {
        alert("Product added successfully");
        navigate(backLocation);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="product__form">
      <div className="product__form__col">
        <div className="product__form__col__panel">
          <Input
            type="text"
            label="Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="Title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="product__form__col__panel">
          <div className="product__form__col__panel__heading">Pricing</div>

          <Input
            type="number"
            label="Enter Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock"
          />
          <Input
            type="number"
            label="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </div>
        <div className="product__form__col__panel">
          <div className="product__form__col__panel__heading">Image</div>
          <div className="popup__wrapper__card__header__img">
            <img src={image} alt="Upload Icon" />
            <label
              className="popup__wrapper__card__header__svg"
              htmlFor="image-upload"
            >
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) {
                    return;
                  }

                  // max file size 1mb
                  if (file.size > 1024 * 1024) {
                    alert("File size should be less than 1mb");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectedImage(reader.result);
                    setImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 208 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M184 24H156.28L142.65 3.56C141.92 2.46552 140.931 1.56803 139.771 0.947056C138.611 0.326082 137.316 0.000790049 136 0H72C70.6843 0.000790049 69.3891 0.326082 68.2291 0.947056C67.0691 1.56803 66.0802 2.46552 65.35 3.56L51.71 24H24C17.6348 24 11.5303 26.5286 7.02944 31.0294C2.52856 35.5303 0 41.6348 0 48V160C0 166.365 2.52856 172.47 7.02944 176.971C11.5303 181.471 17.6348 184 24 184H184C190.365 184 196.47 181.471 200.971 176.971C205.471 172.47 208 166.365 208 160V48C208 41.6348 205.471 35.5303 200.971 31.0294C196.47 26.5286 190.365 24 184 24ZM192 160C192 162.122 191.157 164.157 189.657 165.657C188.157 167.157 186.122 168 184 168H24C21.8783 168 19.8434 167.157 18.3431 165.657C16.8429 164.157 16 162.122 16 160V48C16 45.8783 16.8429 43.8434 18.3431 42.3431C19.8434 40.8429 21.8783 40 24 40H56C57.3174 40.0009 58.6147 39.6764 59.7765 39.0553C60.9383 38.4343 61.9288 37.5359 62.66 36.44L76.28 16H131.71L145.34 36.44C146.071 37.5359 147.062 38.4343 148.223 39.0553C149.385 39.6764 150.683 40.0009 152 40H184C186.122 40 188.157 40.8429 189.657 42.3431C191.157 43.8434 192 45.8783 192 48V160ZM104 56C95.2976 56 86.7907 58.5806 79.5549 63.4153C72.3191 68.2501 66.6796 75.122 63.3493 83.1619C60.019 91.2019 59.1477 100.049 60.8455 108.584C62.5432 117.119 66.7338 124.959 72.8873 131.113C79.0408 137.266 86.8809 141.457 95.416 143.155C103.951 144.852 112.798 143.981 120.838 140.651C128.878 137.32 135.75 131.681 140.585 124.445C145.419 117.209 148 108.702 148 100C147.987 88.3345 143.347 77.1507 135.098 68.9019C126.849 60.6532 115.665 56.0132 104 56ZM104 128C98.4621 128 93.0486 126.358 88.444 123.281C83.8395 120.204 80.2506 115.831 78.1314 110.715C76.0121 105.599 75.4576 99.9689 76.538 94.5375C77.6184 89.106 80.2851 84.1169 84.201 80.201C88.1169 76.2851 93.106 73.6184 98.5375 72.538C103.969 71.4576 109.599 72.0121 114.715 74.1314C119.831 76.2506 124.204 79.8395 127.281 84.444C130.358 89.0486 132 94.4621 132 100C132 107.426 129.05 114.548 123.799 119.799C118.548 125.05 111.426 128 104 128Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="product__form__col">
        <div
          className="product__form__col__panel"
          style={{
            padding: "2em",
          }}
        >
          <button
            onClick={handleSubmit}
            className="container__main__content__details__buttons__button container__main__content__details__buttons__primary"
          >
            Add New Product
          </button>
          <Link
            to={backLocation}
            className="container__main__content__details__buttons__button container__main__content__details__buttons__secondary"
          >
            Discard Changes
          </Link>
        </div>
        <div className="product__form__col__panel">
          <Select
            label="Product Category"
            options={categories}
            value={category}
            onChange={(e) => setCategory(e)}
          />
        </div>
      </div>
    </div>
  );
}
