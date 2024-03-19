import { LogoutOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { ICustomProps } from "../../types";

export const CustomCard = (props: ICustomProps) => {
  return (
    <Card className="card">
      <div>
        <div>
          <div className="inventory-icon">
            <LogoutOutlined height={50} width={50} />
            <p>{props.text}</p>
          </div>
        </div>
        <h2>{props.value}</h2>
      </div>
    </Card>
  );
};
