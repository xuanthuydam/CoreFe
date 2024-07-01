import { Tooltip } from "antd";
import { useEffect, useState } from "react";

const ImageWithTooltip = ({ url }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setLoaded(true);
  }, [url]);

  return (
    <Tooltip
      visible={visible}
      title={<img src={url} alt="preview" style={{ width: 200 }} />}
      placement="right"
    >
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {loaded ? "View QR" : "Loading..."}
      </span>
    </Tooltip>
  );
};

export default ImageWithTooltip;
