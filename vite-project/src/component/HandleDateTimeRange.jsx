import { Button, DatePicker, Input } from "antd";
import { useEffect, useState } from "react";

const HandleDateTimeRange = ({ onSearch }) => {
  // State to hold selected date range and other filter values
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [memoCode, setMemoCode] = useState("");

  // Handler for date range change
  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };

  // Handler for Search button click
  const handleSearch = () => {
    const filters = {
      //dateRange: selectedDateRange,
      status: status,
      amount: amount,
      memo: memo,
      memo_code: memoCode,
    };

    onSearch(filters);
    console.log("vao khong2");
  };

  const handleReset = () => {
    setMemoCode("");
    setMemo("");
    setAmount("");
    setStatus("");

    onSearch();
  };

  console.log("vao khong1");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="">Date</label>
        <DatePicker.RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="">Status</label>
        <Input value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="">Amount</label>
        <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="">Memo</label>
        <Input value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="">Memo Code</label>
        <Input value={memoCode} onChange={(e) => setMemoCode(e.target.value)} />
      </div>
      <div>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default HandleDateTimeRange;
