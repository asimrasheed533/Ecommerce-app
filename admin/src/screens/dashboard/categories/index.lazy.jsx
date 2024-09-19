import {
  TableEntryDeleteButton,
  TableEntryEditButton,
  TableEntryImage,
  TableEntryText,
} from "components";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import { useLocation } from "react-router-dom";
import useQuery from "../../../utils/useQuery";
import Loading from "../../../layouts/loading";

export default function categories() {
  const location = useLocation();
  const { data: category, isLoading: loading, mutate } = useQuery("categories");
  return (
    <div className="container__main__content__listing">
      <div className="container__main__content__listing__header">
        <div className="container__main__content__listing__header__left"></div>
        <div className="container__main__content__listing__header__right">
          <Link
            to={location.pathname.toLowerCase() + "/add"}
            className="container__main__content__listing__header__right__button"
          >
            Add
          </Link>
        </div>
      </div>
      <div className="container__main__content__listing__table">
        <div className="container__main__content__listing__table__header">
          <div className="container__main__content__listing__table__header__entry">
            Actions
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Name
          </div>

          <div className="container__main__content__listing__table__header__entry">
            Image
          </div>
        </div>
        <div className="container__main__content__listing__table__content">
          {loading ? (
            <Loading dashboard />
          ) : (
            category.map((item) => (
              <TableEntry item={item} key={item.id} getData={mutate} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function TableEntry({ item }) {
  return (
    <div className="container__main__content__listing__table__content__list">
      <div className="container__main__content__listing__table__content__list__entry">
        <TableEntryEditButton
          to={`/dashboard/categories/edit/${item?.id}`}
          state={{ ...item }}
        />
        <TableEntryDeleteButton
          onClick={() => {
            axios.delete(`categories/${item?.id}`).then(() => {
              getData();
            });
          }}
        />
      </div>
      <TableEntryText>{item?.name}</TableEntryText>
      <TableEntryImage src={item?.img} />
    </div>
  );
}
