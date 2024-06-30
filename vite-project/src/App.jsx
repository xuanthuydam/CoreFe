import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Button, Space, Tag, Checkbox, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 200,
    },
    filters: {},
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setTableParams({
      ...tableParams,
      pagination: {
        current: 1,
        pageSize: 10,
      },
      filters: {
        ...tableParams.filters,
        [dataIndex]: selectedKeys[0],
      },
    });
  };

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    setSearchText("");
    const newFilters = { ...tableParams.filters };
    delete newFilters[dataIndex];
    setTableParams({
      ...tableParams,
      filters: newFilters,
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  const columns = [
    {
      key: "scode",
      title: "Service number",
      dataIndex: "scode",
      ...getColumnSearchProps("scode"),
    },
    {
      key: "orderid",
      title: "Order id",
      dataIndex: "orderid",
      sorter: (a, b) => a.orderid.localeCompare(b.orderid),
      ...getColumnSearchProps("orderid"),
    },
    {
      key: "time_order",
      title: "Time order",
      dataIndex: "time_order",
      sorter: (a, b) => new Date(a.time_order) - new Date(b.time_order),
      ...getColumnSearchProps("time_order"),
    },
    {
      key: "bank_name",
      title: "Bank name",
      dataIndex: "bank_name",
      ...getColumnSearchProps("bank_name"),
    },
    { key: "bank_no", title: "Bank no", dataIndex: "bank_no" },
    {
      key: "account_name",
      title: "Account name",
      dataIndex: "account_name",
      ...getColumnSearchProps("account_name"),
    },
    {
      key: "money",
      title: "Money",
      dataIndex: "money",
      sorter: (a, b) => a.money - b.money,
      ...getColumnSearchProps("money"),
    },
    {
      key: "order_status",
      title: "Status",
      dataIndex: "order_status",
      ...getColumnSearchProps("order_status"),
      render: (text) => {
        let color =
          text === "pending" ? "volcano" : text === "Approved" ? "green" : "";
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const handlePostRequest = async () => {
    try {
      setLoading(true);

      const param = {
        pageSize: tableParams.pagination.pageSize,
        pageIndex: tableParams.pagination.current,
        ...tableParams.filters, // Gửi bộ lọc tìm kiếm tới API
      };

      const result = await axios.post(
        "https://paymentapi-5875fa5873a8.herokuapp.com/api/post/filter/withdrawal",
        param
      );

      setLoading(false);
      setData(result?.data?.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: result?.data?.totalRecords, // Giả sử API của bạn trả về tổng số mục
        },
      });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    handlePostRequest();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.filters,
  ]);

  return (
    <div>
      <Divider>Columns displayed</Divider>
      <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={(value) => {
          setCheckedList(value);
        }}
      />

      <Table
        columns={newColumns}
        dataSource={data}
        onChange={handleTableChange}
        loading={loading}
        pagination={tableParams.pagination}
        bordered={true} // Chia cột
        className="custom-table"
        scrollToFirstRowOnChange={true}
      />
    </div>
  );
};

export default App;
