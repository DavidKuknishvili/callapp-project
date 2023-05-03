import { Pie, G2 } from "@ant-design/plots";
import { Row } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { usePersonStore } from "./store";

function PieChart() {
  const { persons } = usePersonStore();

  const maleCount = persons?.filter((d) => d.gender === "male").length;
  const femaleCount = persons?.filter((d) => d.gender === "female").length;

  const G = G2.getEngine("canvas");
  const data: any = [
    {
      type: "Male",
      value: maleCount,
    },
    {
      type: "Female",
      value: femaleCount,
    },
  ];

  const cfg: any = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    legend: false,
    color: ["#1890ff", "#f5222d"],
    label: {
      type: "spider",
      labelHeight: 40,
      formatter: (data: any, mappingData: any) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 8,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 0,
            y: 25,
            text: `${data.value} | ${(data.percent * 100).toFixed(2)}%`,
            fill: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  const config: any = cfg;
  return (
    <>
      <Row
        align={"middle"}
        style={{ margin: "0 16px " }}
        justify={"space-between"}
      >
        <Link to={"/"}>
          <LeftOutlined />
          Back
        </Link>
        <h1>Pie Cart</h1>
      </Row>
      <Pie {...config} />
    </>
  );
}

export default PieChart;
