import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "../axios.js";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/teacher/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("ошибка получения преподавателя");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.surname}
        user={data.user}
        createdAt={data.createdAt}
        name={data.name}
        surname={data.surname}
        patronimyc={data.patronimyc}
        seniority={data.seniority}
        seriesPasport={data.seriesPasport}
        numberPasport={data.numberPasport}
        imageUrl={"http://localhost:2000" + data.imageUrl}
        isEditable
        isFullPost
      ></Post>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="1" title="Общие сведения">
          <ListGroup>
            <ListGroup.Item>Фамилия: {data.surname} </ListGroup.Item>
            <ListGroup.Item>Имя: {data.name}</ListGroup.Item>
            <ListGroup.Item>Отчество: {data.patronimyc}</ListGroup.Item>
            <ListGroup.Item>Стаж: {data.seniority}</ListGroup.Item>
            <ListGroup.Item>
              Серия паспорта: {data.seriesPasport}
            </ListGroup.Item>
            <ListGroup.Item>
              Номер паспорта: {data.numberPasport}
            </ListGroup.Item>
            <ListGroup.Item>
              Дата выдачи паспорта: {data.dateIssue}
            </ListGroup.Item>
            <ListGroup.Item>код подразделения: {data.unitCode}</ListGroup.Item>
            <ListGroup.Item>кем выдан: {data.whoIssued}</ListGroup.Item>
            <ListGroup.Item>пол: {data.sex}</ListGroup.Item>
            <ListGroup.Item>дата рождения: {data.bornDate}</ListGroup.Item>
            <ListGroup.Item>место рождения: {data.bornPlace}</ListGroup.Item>
            <ListGroup.Item>прописка: {data.registration}</ListGroup.Item>
            <ListGroup.Item>
              фактическое место проживания: {data.actualLiving}
            </ListGroup.Item>
            <ListGroup.Item>СНИЛС: {data.SNILS}</ListGroup.Item>
          </ListGroup>
        </Tab>
        <Tab eventKey="2" title="образование">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Номер свидетельства</th>
                <th>дата получения</th>
                <th>наименование образовательного учреждения</th>
                <th>специальность</th>
              </tr>
            </thead>
            <tbody>
              {data.education.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.certificationNumber}</td>
                    <td>{element.dataReceipt}</td>
                    <td>{element.universityName}</td>
                    <td>{element.speciality}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="3" title="курсы повышения квалификации">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>номер</th>
                <th>дата завершения</th>
                <th>время прохождения</th>
                <th>специальность</th>
              </tr>
            </thead>
            <tbody>
              {data.course.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.number}</td>
                    <td>{element.dateEnd}</td>
                    <td>{element.hours} (часов)</td>
                    <td>{element.speciality}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="4" title="предмет">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Название учебной дисциплины</th>
              </tr>
            </thead>
            <tbody>
              {data.lesson.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="5" title="состав семьи">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Родство</th>
                <th>дата рождения</th>
              </tr>
            </thead>
            <tbody>
              {data.family.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.surname}</td>
                    <td>{element.name}</td>
                    <td>{element.patronimyc}</td>
                    <td>{element.kinship}</td>
                    <td>{element.bornDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={true}
      >
        {/* <Index /> */}
      {/* </CommentsBlock> */}
    </>
  );
};
