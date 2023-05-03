import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Input, Space, Select } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { addRecord, updateRecord } from "../api/api";
import { Person } from "../App";
import { usePersonStore } from "../store";

export default function ModalComponent({
  open,
  setModalOpen,
  id,
  mode,
  rowData,
}: {
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  mode: string;
  rowData?: Person;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string | undefined>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [phoneCounty, setPhoneCounty] = useState<number>();
  const [phoneAarea, setPhoneArea] = useState<number>();
  const [phoneLocal, setPhoneLocal] = useState<number>();

  const { addPerson, editPerson } = usePersonStore();

  const inputField = (data?: Person) => {
    setName(data ? data.name : "");
    setEmail(data ? data.email : "");
    setGender(data ? data.gender : "");
    setCity(data ? data.address.city : "");
    setStreet(data ? data.address.street : "");
    setPhoneCounty(data ? parseInt(data.phone.split(" ")[0]) : undefined);
    setPhoneArea(
      data ? parseInt(data.phone.split(" ")[1].replace(/\D/g, "")) : undefined
    );
    setPhoneLocal(
      data ? parseInt(data.phone.split(" ")[2].replace(/\D/g, "")) : undefined
    );
    setGender(data ? data.gender : undefined);
  };

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (mode === "Edit" && rowData) {
      inputField(rowData);
    } else {
      inputField();
    }
  }, [open]);

  return (
    <Modal
      title={`${mode} record    ID: ${id}`}
      centered
      open={open}
      okText="Save"
      onOk={() => {
        if (
          name !== "" &&
          email !== "" &&
          gender !== "" &&
          gender &&
          street !== "" &&
          city !== "" &&
          phoneCounty &&
          phoneAarea &&
          phoneLocal &&
          validateEmail(email)
        ) {
          const person: Person = {
            id: id,
            name: name,
            email: email,
            gender: gender,
            address: {
              street: street,
              city: city,
            },
            phone:
              "+" +
              phoneCounty +
              ` (${phoneAarea}) ` +
              `${phoneLocal.toString().slice(0, 3)}-${phoneLocal
                .toString()
                .slice(3)}`,
          };

          if (mode === "Edit") {
            editPerson(person);
            updateRecord(person);
          } else {
            addPerson(person);
            addRecord(person);
          }
          setModalOpen(false);
          inputField();
        }
      }}
      onCancel={() => {
        inputField();

        setModalOpen(false);
      }}
    >
      <Space size={12} direction="vertical">
        <Space style={{ width: "100%" }}>
          <Input
            style={{ width: "100%" }}
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            placeholder="Gender"
            style={{ width: "100%" }}
            size="large"
            value={gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={(selectedOption) => setGender(selectedOption)}
          />
        </Space>

        <Input
          style={{ width: "100%" }}
          size="large"
          placeholder="Email"
          value={email}
          type="email"
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Space.Compact size="large" style={{ width: "100%" }}>
          <Input
            size="large"
            style={{ width: "17%" }}
            value={phoneCounty}
            placeholder="+1"
            type="number"
            maxLength={3}
            prefix={<PhoneOutlined />}
            onChange={(e) => setPhoneCounty(parseInt(e.target.value))}
          />
          <Input
            size="large"
            style={{ width: "15%" }}
            placeholder="815"
            max={3}
            type="number"
            value={phoneAarea}
            onChange={(e) => setPhoneArea(parseInt(e.target.value))}
          />
          <Input
            size="large"
            style={{ width: "68%" }}
            placeholder="425-3440"
            value={phoneLocal}
            type="number"
            onChange={(e) => setPhoneLocal(parseInt(e.target.value))}
          />
        </Space.Compact>
        <Space.Compact size="large" style={{ width: "100%" }}>
          <Input
            size="large"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <Input
            size="large"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Space.Compact>
      </Space>
    </Modal>
  );
}
