/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Table, Space } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ImyTableProps, Item } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { remove, toggleVisibility } from "../../redux/slices/inventoryData";
import { CustomModal } from "..";

export const MyTable = (props: ImyTableProps) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mode = useAppSelector((state) => state.mode);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    mode.mode === "user" ? (
      <></>
    ) : (
      {
        title: "Action",
        key: "action",
        render: (record: Item) => (
          <Space size="middle" key={record.name}>
            {record.visible ? (
              <a onClick={() => handleEdit(record)}>
                <EditOutlined />
              </a>
            ) : (
              <div>
                <EditOutlined />
              </div>
            )}
            <a onClick={() => handleView(record)}>
              {record.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </a>

            <a onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </a>
          </Space>
        ),
      }
    ),
  ];
  //toggleVisibility
  const handleView = (record: Item) => {
    dispatch(toggleVisibility(record.name));
  };

  const handleEdit = (record: Item) => {
    // Logic for edit action
    //@ts-ignore
    setSelectedRowData(record);
    setModalVisible(true);
  };

  const handleDelete = (record: Item) => {
    // Logic for delete action
    dispatch(remove({ name: record.name }));
  };

  const dispatch = useAppDispatch();
  //@ts-nocheck
  const filterData =
    mode.mode === "user"
      //@ts-ignore
      ? props?.data?.data.filter((item) => item.visible === true)
      //@ts-expect-error
      : props.data.data;
  return (
    <>
      <Table
        loading={props.isLoading}
        pagination={false}
        dataSource={filterData}
        //@ts-ignore
        columns={columns}
      />

      <CustomModal
        modalVisible={modalVisible}
        selectedRowData={selectedRowData}
        setModalVisible={setModalVisible}
        setSelectedRowData={setSelectedRowData}
      />
    </>
  );
};
