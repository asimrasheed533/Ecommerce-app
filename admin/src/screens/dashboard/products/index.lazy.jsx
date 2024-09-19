import {
  TableEntryDeleteButton,
  TableEntryEditButton,
  TableEntryImage,
  TableEntryStatus,
  TableEntryText,
} from "components";
import { useCallback, useEffect, useState } from "react";

import { Link } from "router";
import Loading from "../../../layouts/loading";
import { TableEntryDescription } from "../../../components";
import axios from "../../../utils/axios";
import { useLocation } from "react-router-dom";
import useQuery from "../../../utils/useQuery";

export default function Products() {
  const location = useLocation();

  const { data: products, isLoading: loading, mutate } = useQuery("products");

  const [query, setQuery] = useState("");

  const filter = useCallback((products) => {
    return products?.filter((product) => {
      return (
        product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.price?.toString().includes(query) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, []);

  return (
    <div className="container__main__content__listing">
      <div className="container__main__content__listing__header">
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
            Type
          </div>

          <div className="container__main__content__listing__table__header__entry">
            Image
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Title
          </div>

          <div className="container__main__content__listing__table__header__entry">
            Price
          </div>

          <div className="container__main__content__listing__table__header__entry">
            Stock
          </div>

          <div className="container__main__content__listing__table__header__entry">
            Description
          </div>
        </div>
        <div className="container__main__content__listing__table__content">
          {loading ? (
            <Loading dashboard />
          ) : (
            filter(products).map((product) => (
              <TableEntry key={product.id} product={product} getData={mutate} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
function TableEntry({ product, getData }) {
  return (
    <div className="container__main__content__listing__table__content__list">
      <div className="container__main__content__listing__table__content__list__entry">
        <TableEntryEditButton state={{ ...product }} />
        <TableEntryDeleteButton
          onClick={() => {
            axios.delete(`products/${product.id}`).then(() => {
              getData();
            });
          }}
        />
      </div>

      <TableEntryStatus
        defaultValue={{
          value: product.type,
          label: product.type,
        }}
        options={[
          {
            value: "product",
            label: "product",
          },
          {
            value: "featured",
            label: "featured",
          },
          {
            value: "latest",
            label: "latest",
          },
        ]}
        onChange={(e) => {
          axios
            .put(`products/${product.id}`, {
              type: e.value,
            })
            .then(() => {
              getData();
            });
        }}
      />

      <TableEntryImage src={product?.img} />
      <TableEntryText className="container__main__content__listing__table__content__list__entry">
        {product.title}
      </TableEntryText>

      <TableEntryText className="container__main__content__listing__table__content__list__entry">
        {product.price}
      </TableEntryText>

      <TableEntryText className="container__main__content__listing__table__content__list__entry">
        {product.stock}
      </TableEntryText>

      <TableEntryDescription className="container__main__content__listing__table__content__list__entry">
        {product?.description}
      </TableEntryDescription>
    </div>
  );
}
