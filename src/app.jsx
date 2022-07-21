import "./app.css";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const ImageCompare = () => {
  const constraintRef = useRef(null);
  const [wrapperRectX, setWrapperRectX] = useState([0, 0]);
  const [edge, setEdge] = useState(0);

  useEffect(() => {
    if (!constraintRef.current) return;

    const rect = constraintRef.current.getBoundingClientRect();

    setWrapperRectX([rect.left, rect.right]);
    setEdge(constraintRef.current.clientWidth);
  }, [constraintRef.current]);

  const onPan = (_, { point }) => {
    const pointX = Math.max(0, point.x - 25);
    setEdge(pointX - wrapperRectX[0]);
  };

  const calculateEdge = () => {
    const wrapWidth = constraintRef.current?.clientWidth ?? 0;
    return Math.max(0, wrapWidth - edge - 50);
  };

  return (
    <div style={{ padding: "3rem" }}>
      <p style={{ color: "white" }}>X: {calculateEdge()}px</p>
      <div className="wrapper">
        <motion.div
          ref={constraintRef}
          style={{ width: 625, height: 775, padding: 25 }}
        >
          <div className="view-window">
            <img src="pic-1.jpg" />
            <div
              className="comparison"
              style={{
                right: calculateEdge(),
                backgroundImage: "url('pic-2.jpg')",
              }}
            />
          </div>
          <motion.div
            dragConstraints={constraintRef}
            onPan={onPan}
            dragMomentum={false}
            dragElastic={false}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "10px",
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              right: "0",
            }}
            drag="x"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <>
      <ImageCompare />
    </>
  );
}
