import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Checkbox,
  Divider,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";
import columns from "./columns_table/order.jsx";
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

  // const defaultCheckedList = columns.map((item) => item.key);
  // const [checkedList, setCheckedList] = useState(defaultCheckedList);
  // const options = columns.map(({ key, title }) => ({
  //   label: title,
  //   value: key,
  // }));
  // const newColumns = columns.map((item) => ({
  //   ...item,
  //   hidden: !checkedList.includes(item.key),
  // }));

  const handlePostRequest = async () => {
    try {
      setLoading(true);

      const param = {
        pageSize: tableParams.pagination.pageSize,
        pageIndex: tableParams.pagination.current,
        ...tableParams.filters, // Gửi bộ lọc tìm kiếm tới API
      };

      const result = await axios.post(
        "https://paymentapi-5875fa5873a8.herokuapp.com/api/bank",
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
    //If change page size else back a apage 1
    const newPagination = {
      ...pagination,
      current:
        pagination.pageSize !== tableParams.pagination?.pageSize
          ? 1
          : pagination.current,
    };

    setTableParams({
      pagination: newPagination,
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
      {/* <Divider>Columns displayed</Divider>
      <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={(value) => {
          setCheckedList(value);
        }}
      /> */}

      <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        loading={loading}
        pagination={tableParams.pagination}
        bordered={true} // Chia cột
        className="custom-table"
        //scroll
        scroll={{ y: "70vh" }} // Set the height for vertical scrolling
        scrollToFirstRowOnChange={true}
      />
    </div>
  );
};

export default App;
