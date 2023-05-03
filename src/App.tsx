import { useEffect, useState } from "react";
import { Button, Tag, Table, Space, Row } from "antd";
import { deleteRecord, getRecords } from "./api/api";
import ModalComponent from "./components/modal";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { usePersonStore } from "./store";

export interface Person {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

function App() {
  const [data, setData] = useState<Person[]>();
  const [open, setModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [modalMode, setModalMode] = useState<string>("");
  const [modalRowData, setModaRowData] = useState<Person>();

  const { persons, savePersons, deletePerson } = usePersonStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecords();
      const addToSore = savePersons(response);
    };

    fetchData();
  }, []);

  const deleteRrequest = async (id: number) => {
    const response = await deleteRecord(id);
    const addFromStore = deletePerson(id);
  };

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",

      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],

      render: (_: any, record: any) => (
        <Tag
          color={record.gender === "male" ? "geekblue" : "volcano"}
          key={record.id}
        >
          {record.gender.charAt(0).toUpperCase() + record.gender.slice(1)}
        </Tag>
      ),

      onFilter: (value: string, record: any) =>
        record.gender.indexOf(value) === 0,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text: string, record: Person) =>
        `${record.address.street}, ${record.address.city}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: " ",
      dataIndex: " ",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            danger
            type="text"
            onClick={() => {
              deleteRrequest(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        pagination={false}
        sticky
        scroll={{ y: 500 }}
        dataSource={persons}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setModalOpen((e) => !e);
              setId(record.id);
              setModaRowData(record);
              setModalMode("Edit");
            },
          };
        }}
        columns={columns}
        size="small"
        bordered
        title={() => (
          <Row justify={"space-between"} align={"middle"}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setModalOpen((e) => !e);
                setModalMode("Add");
                setId(persons[persons.length - 1].id + 1);
              }}
            >
              Add New
            </Button>
            <h1>TABLE</h1>
            <Link to={"/pie"}>
              <Button type="link" size="large">
                Pie Chart
                <RightOutlined />
              </Button>
            </Link>
          </Row>
        )}
      />
      <div>
        <ModalComponent
          rowData={modalRowData}
          mode={modalMode}
          open={open}
          setModalOpen={setModalOpen}
          id={id}
        />
      </div>
    </>
  );
}

export default App;
