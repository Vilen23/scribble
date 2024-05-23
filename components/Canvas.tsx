import { EraserIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";

interface LineProps {
  tool: string;
  points: number[];
}
export default function Canvas() {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState<LineProps[]>([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const target = e.target as unknown as Konva.Node;
    const stage = target.getStage();
    const pos = stage?.getPointerPosition();
    if (pos && pos.x && pos.y) {
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;
    const stage = (e.target as unknown as Konva.Node).getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point?.x || 0, point?.y || 0]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex gap-4 mb-2">
        <FaPencilAlt
          onClick={() => {
            setTool("pen");
          }}
          className={`${
            tool === "pen" && "border-2 border-black/40 rounded-xl "
          } p-2 text-4xl`}
        />
        <FaEraser
          onClick={() => {
            setTool("eraser");
          }}
          className={`${
            tool === "eraser" && "border-2 border-black/40 rounded-xl"
          } p-2 text-4xl `}
        />
      </div>
      <Stage
      className="border-2 border-black/80"
        width={window.innerWidth}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
