import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HandleDateTimeRange from "../component/HandleDateTimeRange";
import TotalDepositAndWithdrawal from "../component/TotalDepositAndWithdrawal";
import "../App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      // showQuickJumper: true,
      //showTotal: (total) => `Total ${total} items`,
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

  const columns = [
    // {
    //   key: "id",
    //   title: "Id",
    //   dataIndex: "id",
    //   sorter: (a, b) => a.money - b.money,
    //   ...getColumnSearchProps("id"),
    // },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      ...getColumnSearchProps("status"),
      render: (text) => {
        let color = text.includes("success")
          ? "green"
          : text.includes("err")
          ? "red"
          : "warning";
        return text !== "" ? <Tag color={color}>{text}</Tag> : null;
      },
    },
    {
      key: "bankCode",
      title: "Bank code",
      dataIndex: "bankCode",
      sorter: (a, b) => a.bankCode.localeCompare(b.bankCode),
      ...getColumnSearchProps("bankCode"),
    },
    {
      key: "accountNumber",
      title: "Account number",
      dataIndex: "accountNumber",
      sorter: (a, b) => a.accountNumber - b.accountNumber,
      ...getColumnSearchProps("accountNumber"),
    },
    {
      key: "accountName",
      title: "Account name",
      dataIndex: "accountName",
      sorter: (a, b) => a.accountName.localeCompare(b.accountName),
      ...getColumnSearchProps("accountName"),
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      ...getColumnSearchProps("type"),
      render: (text) => {
        let color = text === "deposit" ? "green" : "red";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      key: "money",
      title: "Money",
      dataIndex: "money",
      sorter: (a, b) => a.money - b.money,
      ...getColumnSearchProps("money"),
      render: (text) => {
        return parseInt(text)?.toLocaleString();
      },
    },
    {
      key: "memo",
      title: "Memo",
      dataIndex: "memo",
      sorter: (a, b) => a.memo.localeCompare(b.memo),
      ...getColumnSearchProps("memo"),
      ellipsis: true,
    },
    {
      key: "memo_code",
      title: "Memo code",
      dataIndex: "memo_code",
      sorter: (a, b) => a.memo_code.localeCompare(b.memo_code),
      ...getColumnSearchProps("memo_code"),
    },
    {
      key: "balance",
      title: "Balance",
      dataIndex: "balance",
      sorter: (a, b) => a.balance.localeCompare(b.balance),
      ...getColumnSearchProps("balance"),
      render: (text) => {
        return parseInt(text)?.toLocaleString();
      },
    },
    {
      key: "createdAt",
      title: "Create at",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.time_order) - new Date(b.time_order),
      ...getColumnSearchProps("createdAt"),
    },
  ];

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
      // console.log("param", param.tableParams.filters);
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
      setData(result?.data);
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

  const handleFilters = (newFilters) => {
    console.log("newFilters", newFilters);
    setTableParams({
      ...tableParams,
      pagination: {
        current: 1,
        pageSize: 10,
      },
      filters: newFilters,
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    //If change page size else back a apage 1
    console.log("pagination", pagination);
    console.log("pagination", filters);
    console.log(sorter);
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
      <HandleDateTimeRange onSearch={handleFilters} />
      <TotalDepositAndWithdrawal data={data} />
      <Table
        columns={columns}
        dataSource={data?.data}
        onChange={handleTableChange}
        loading={loading}
        pagination={tableParams.pagination}
        bordered={true} // Chia cột
        className="custom-table"
        //scroll
        scroll={{ y: "70vh" }} // Set the height for vertical scrolling
        scrollToFirstRowOnChange={true}
        sc
      />
    </div>
  );
};

export default App;
