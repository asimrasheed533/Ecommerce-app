import {
  Avatar,
  TableEntryDeleteButton,
  TableEntryImage,
  TableEntryText,
  TableEntryViewButton,
} from "components";
import useQuery from "../../../utils/useQuery";
import Loading from "../../../layouts/loading";
import { Search } from "react-feather";
import axios from "../../../utils/axios";
export default function orders() {
  const {
    data: response = {},
    isLoading: loading,
    mutate,
  } = useQuery("orders");

  const order = response.data || [];

  return (
    <div className="container__main__content__listing">
      <div className="container__main__content__listing__header">
        <div className="container__main__content__listing__header__left">
          <form className="container__main__content__listing__header__left__search">
            <input
              type="text"
              placeholder="Search"
              className="container__main__content__listing__header__left__search__field"
            />
            <button className="container__main__content__listing__header__left__search__button">
              <Search size={20} color="currentColor" />
            </button>
          </form>
        </div>
      </div>
      <div className="container__main__content__listing__table">
        <div className="container__main__content__listing__table__header">
          <div className="container__main__content__listing__table__header__entry">
            Actions
          </div>
          <div className="container__main__content__listing__table__header__entry">
            images
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Order ID
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Email
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Customer name
          </div>
          <div className="container__main__content__listing__table__header__entry">
            Phone No.
          </div>
        </div>
        <div className="container__main__content__listing__table__content">
          {loading ? (
            <Loading dashboard />
          ) : (
            order.map((item) => (
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
        {/* <TableEntryViewButton /> */}
        <TableEntryDeleteButton
          onClick={() => {
            axios.delete(`orders/${item?.id}`).then(() => {
              getData();
            });
          }}
        />
      </div>
      <TableEntryImage
        className="container__main__content__listing__table__content__list__entry"
        style={{ gap: 10, flexWrap: "wrap" }}
      >
        <Avatar className="container__main__content__listing__table__content__list__entry__img" />
      </TableEntryImage>
      <TableEntryText>{item.id}</TableEntryText>
      <TableEntryText>{item?.email}</TableEntryText>
      <TableEntryText>{item?.firstName}</TableEntryText>
      <TableEntryText>{item?.number}</TableEntryText>
    </div>
  );
}
