import { Tag } from "antd";
import ImageWithTooltip from "../component/ImageWithTooltip";

const columns = [
  {
    key: "scode",
    title: "Service number",
    dataIndex: "scode",
    //   ...getColumnSearchProps("scode"),
  },
  {
    key: "orderid",
    title: "Order id",
    dataIndex: "orderid",
    // /sorter: (a, b) => a.orderid.localeCompare(b.orderid),
    //   ...getColumnSearchProps("orderid"),
  },
  {
    key: "time_order",
    title: "Time order",
    dataIndex: "time_order",
    //sorter: (a, b) => new Date(a.time_order) - new Date(b.time_order),
    //   ...getColumnSearchProps("time_order"),
  },
  {
    key: "bank_name",
    title: "Bank name",
    dataIndex: "bank_name",
    //   ...getColumnSearchProps("bank_name"),
  },
  { key: "bank_no", title: "Bank no", dataIndex: "bank_no" },
  {
    key: "account_name",
    title: "Account name",
    dataIndex: "account_name",
    //   ...getColumnSearchProps("account_name"),
  },
  {
    key: "money",
    title: "Money",
    dataIndex: "money",
    //sorter: (a, b) => a.money - b.money,
    //   ...getColumnSearchProps("money"),
  },
  {
    key: "order_status",
    title: "Status",
    dataIndex: "order_status",
    //   ...getColumnSearchProps("order_status"),
    render: (text) => {
      let color =
        text === "pending" ? "volcano" : text === "success" ? "green" : "red";
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    key: "url",
    title: "QR",
    dataIndex: "url",
    render: (text, record) => <ImageWithTooltip url={record.url} />,
  },
];

export default columns;
