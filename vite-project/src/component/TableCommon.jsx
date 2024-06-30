import React, { useEffect } from "react";
import axios from "axios";

const TableCommon = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePostRequest = async () => {
      try {
        const result = await axios.post(
          "https://paymentapi-5875fa5873a8.herokuapp.com/api/post/filter/withdrawal",
          new URLSearchParams({ scode: "CID13906" }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log("--->", result);

        setResponse(result.data);
        setError(null);
      } catch (err) {
        setResponse(null);
        setError(err.message);
      }
    };

    handlePostRequest();
  }, []);

  return <div></div>;
};

export default TableCommon;
