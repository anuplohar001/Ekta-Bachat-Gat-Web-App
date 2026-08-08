import React from "react";
import "./Loader.css";

interface LoaderProps {
  size?: number;
  color?: string;
  blur?: boolean;
  isList?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 70,
  color = "#243d22",
  blur = true,
  isList = false,
}) => {
  const ballSize = size / 6;

  const ballStyle: React.CSSProperties = {
    width: `${ ballSize } px`,
    height: `${ ballSize } px`,
    backgroundColor: color,
  };

  return (
    <div
      className="loader-overlay"
      style={{
        backgroundColor: blur ? "rgba(40, 40, 40, 0.1)" : "",
        position: isList ? undefined : "absolute",
      }}
    >
      <div
        className="ball-spin"
        style={{
          width: size,
          height: size,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`ball ball - ${ i + 1 } `}
            style={ballStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
