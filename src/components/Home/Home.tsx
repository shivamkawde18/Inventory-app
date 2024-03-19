/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { CustomCard, MyTable } from "..";
import { Switch } from "antd";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData } from "../../redux/slices/inventoryData";
import { setMode } from "../../redux/slices/user";
import { getValue, numberOfCategory, outOfStock } from "../../utils";
import { Item } from "../../types";

export const Home = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode);
  const data = useAppSelector((state) => state.inventoryData);
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const filterData =
    mode.mode === "user"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ? data?.data.filter((item: Item) => item.visible === true)
      : data?.data;

  return (
    data.isError ? <h1>somthing went</h1> :
      <div className="container">

        <div className="user-mode">
          admin
          <Switch
            onChange={() => {
              //@ts-expect-error
              dispatch(setMode(mode));
            }}
          />
          user
        </div>

        <h2>Inventory Stats</h2>

        <div className="inventory-data">
          <CustomCard
            value={data.data ? filterData?.length : 0}
            text="Total Product"
          />
          <CustomCard
            //@ts-ignore
            value={data.data ? `$${getValue(filterData)}` : 0}
            text="Total store value"
          />
          <CustomCard
            value={data.data ? outOfStock(filterData)?.length : 0}
            text="Out of stocks"
          />
          <CustomCard
            value={data.data ? numberOfCategory(filterData).length : 0}
            text="Number of category"
          />
        </div>

        <MyTable data={data} isLoading={data.isLoading} isError={data.isError} />
      </div>
  );
};
