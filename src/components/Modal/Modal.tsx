import { Input, Modal } from "antd";

import { update } from "../../redux/slices/inventoryData";
import { useAppDispatch } from "../../redux/hooks";

export const CustomModal = (props: any) => {
  const dispatch = useAppDispatch();
  const { modalVisible, selectedRowData, setModalVisible, setSelectedRowData } =
    props;
  return (
    <Modal
      title="Edit Product"
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={() => {
        dispatch(update(selectedRowData));
        setModalVisible(false);
      }}
    >
      {selectedRowData && (
        <div>
          <p>Name: {selectedRowData.name}</p>
          <div className="modal-div">
            <div>
              <h2>Category</h2>
              <Input
                value={selectedRowData.category}
                onChange={(e) => {
                  setSelectedRowData({
                    ...selectedRowData,
                    category: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div>
              <h2>Price</h2>
              <Input
                value={selectedRowData?.price}
                onChange={(e) => {
                  setSelectedRowData({
                    ...selectedRowData,
                    price: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="modal-div">
            <div>
              <h2>Quantity</h2>
              <Input
                value={selectedRowData.quantity}
                onChange={(e) => {
                  setSelectedRowData({
                    ...selectedRowData,
                    quantity: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div>
              <h2>Value</h2>
              <Input
                value={selectedRowData.value}
                onChange={(e) => {
                  setSelectedRowData({
                    ...selectedRowData,
                    value: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
