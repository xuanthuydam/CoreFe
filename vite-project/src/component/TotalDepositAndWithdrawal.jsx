import { Input } from "antd";
import "../style/component/TotalDepositAndWithdrawal.css";
import PropTypes from "prop-types";

const TotalDepositAndWithdrawal = ({ data }) => {
  return (
    <div className="container">
      {/* <label className="container-label" htmlFor="totalDeposit">
        Total Deposit
      </label>
      <Input
        id="totalDeposit"
        type="textarea"
        value={data?.totalDeposit}
        disabled={true}
        style={{ flex: 0.1, margin: "0.1em", color: "green" }}
      ></Input>
      <label className="container-label" htmlFor="totalWithdrawal">
        Total Withdrawal
      </label>
      <Input
        id="totalWithdrawal"
        type="textarea"
        value={data?.totalWithdrawal}
        disabled={true}
        style={{ flex: 0.1, margin: "0.1em", color: "red" }}
      ></Input> */}
      <label htmlFor="" className="container-label" style={{ color: "green" }}>
        +{" "}
        {data?.totalDeposit !== undefined
          ? data?.totalDeposit.toLocaleString()
          : 0}{" "}
        ₫
      </label>
      <label htmlFor="" className="container-label" style={{ color: "red" }}>
        -{" "}
        {data?.totalWithdrawal !== undefined
          ? data?.totalWithdrawal.toLocaleString()
          : 0}
        ₫
      </label>
    </div>
  );
};

TotalDepositAndWithdrawal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TotalDepositAndWithdrawal;
