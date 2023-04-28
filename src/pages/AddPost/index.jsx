import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useSelector } from "react-redux";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [imageUrl, setImageUrl] = React.useState("");
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [isLoading, setLoading] = React.useState("");
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
      console.log(data);
    } catch (err) {
      console.warn(err);
      alert("ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = (event) => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const [ticketClass, setClass] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [flight, setFlight] = React.useState("");
  const [timeOut, setTimeOutSt] = React.useState("");
  const [timeIn, setTimeIn] = React.useState("");

  const inputFileRef = React.useRef(null);

  const [educationData, setEducationData] = React.useState({
    certificationNumber: "",
    dataReceipt: "",
    universityName: "",
    speciality: "",
  });

  const [courseData, setCourseData] = React.useState({
    number: "",
    dateEnd: "",
    hours: "",
    speciality: "",
  });

  const [lessonData, setLessonData] = React.useState({
    name: "",
  });

  const [familyData, setFamilyData] = React.useState({
    surname: "",
    name: "",
    patronimyc: "",
    kinship: "",
    bornDate: "",
  });

  const [teacherData, setTeacherData] = React.useState({
    name: "",
    surname: "",
    patronimyc: "",
    seniority: "",
    seriesPasport: "",
    numberPasport: "",
    dateIssue: "",
    unitCode: "",
    whoIssued: "",
    sex: "",
    bornDate: "",
    bornPlace: "",
    registration: "",
    actualLiving: "",
    SNILS: "",
    education: new Array(),
    course: [],
    lesson: [],
    family: [],
  });

  const [showEducation, setShowEducation] = React.useState(false);
  const [showCourse, setShowCourse] = React.useState(false);
  const [showLesson, setShowLesson] = React.useState(false);
  const [showFamily, setShowFamily] = React.useState(false);
  const [isEditable, setIsEditble] = React.useState(false);

  React.useEffect(() => {
    console.log(imageUrl);
  }, [teacherData]);

  const isEdditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/teacher/${id}`)
        .then(({ data }) => {
          setTeacherData({
            name: data.name,
            surname: data.surname,
            patronimyc: data.patronimyc,
            seniority: data.seniority,
            seriesPasport: data.seriesPasport,
            numberPasport: data.numberPasport,
            dateIssue: data.dateIssue,
            unitCode: data.unitCode,
            whoIssued: data.whoIssued,
            sex: data.sex,
            bornDate: data.bornDate,
            bornPlace: data.bornPlace,
            registration: data.registration,
            actualLiving: data.actualLiving,
            SNILS: data.SNILS,
            education: data.education,
            course: data.course,
            lesson: data.lesson,
            family: data.family,
          });
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          alert("ошибка получения преподавателя");
          console.warn(err);
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        name: teacherData.name,
        surname: teacherData.surname,
        patronimyc: teacherData.patronimyc,
        seniority: teacherData.seniority,
        seriesPasport: teacherData.seriesPasport,
        numberPasport: teacherData.numberPasport,
        dateIssue: teacherData.dateIssue,
        unitCode: teacherData.unitCode,
        whoIssued: teacherData.whoIssued,
        sex: teacherData.sex,
        bornDate: teacherData.bornDate,
        bornPlace: teacherData.bornPlace,
        registration: teacherData.registration,
        actualLiving: teacherData.actualLiving,
        SNILS: teacherData.SNILS,
        education: teacherData.education,
        course: teacherData.course,
        lesson: teacherData.lesson,
        family: teacherData.family,
        imageUrl: imageUrl,
      };
      const { data } = isEdditing
        ? await axios.patch(`/teacher/${id}`, fields)
        : await axios.post("/teacher", fields);
      const _id = isEdditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      alert("Внимание! заполните все поля");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const educationRef = React.useRef();

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {/* <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      /> */}

      {imageUrl && (
        <>
          {" "}
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:2000${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Фамилия
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, surname: e.target.value })
          }
          value={teacherData.surname}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Имя</InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, name: e.target.value })
          }
          value={teacherData.name}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Отчество
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, patronimyc: e.target.value })
          }
          value={teacherData.patronimyc}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <Form.Select
        onChange={(e) =>
          setTeacherData({ ...teacherData, seniority: e.target.value })
        }
        value={teacherData.seniority}
        aria-label="Default select example"
      >
        <option>Стаж</option>
        <option value="1">1 г.</option>
        <option value="2">2 г.</option>
        <option value="3">3 г.</option>
        <option value="4">5 г.</option>
        <option value="5">5 г.</option>
        <option value="6">6 г.</option>
        <option value="7">7 г.</option>
        <option value="8">8 г.</option>
        <option value="9">9 г.</option>
        <option value="10">10 г.</option>
        <option value="11">11 г.</option>
        <option value="12">12 г.</option>
        <option value="13">13 г.</option>
        <option value="14">14 г.</option>
        <option value="15">15 г.</option>
        <option value="16">16 г.</option>
        <option value="17">17 г.</option>
        <option value="18">18 г.</option>
        <option value="19">19 г.</option>
        <option value="20">20 г.</option>
        <option value="21">21 г.</option>
        <option value="22">22 г.</option>
        <option value="23">23 г.</option>
        <option value="24">24 г.</option>
        <option value="25">25 г.</option>
        <option value="26">26 г.</option>
        <option value="27">27 г.</option>
        <option value="28">28 г.</option>
        <option value="29">29 г.</option>
        <option value="30">30 г.</option>
        <option value="31">31 г.</option>
        <option value="32">32 г.</option>
        <option value="33">33 г.</option>
        <option value="34">34 г.</option>
        <option value="35">35 г.</option>
        <option value="36">36 г.</option>
        <option value="37">37 г.</option>
        <option value="38">38 г.</option>
        <option value="39">39 г.</option>
        <option value="40">40 г.</option>
      </Form.Select>
      <InputGroup className="mb-3">
        <InputGroup.Text>Серия и номер паспорта</InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, seriesPasport: e.target.value })
          }
          value={teacherData.seriesPasport}
          aria-label="serial"
        />
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, numberPasport: e.target.value })
          }
          value={teacherData.numberPasport}
          aria-label="number"
        />
      </InputGroup>

      <Form.Group controlId="duedate">
        <InputGroup.Text>Дата выдачи</InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, dateIssue: e.target.value })
          }
          value={teacherData.dateIssue}
          aria-label="number"
          type="date"
          name="duedate"
          placeholder="Due date"
        />
      </Form.Group>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          код подразделения
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, unitCode: e.target.value })
          }
          value={teacherData.unitCode}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          кем выдан
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, whoIssued: e.target.value })
          }
          value={teacherData.whoIssued}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <Form.Select
        onChange={(e) =>
          setTeacherData({ ...teacherData, sex: e.target.value })
        }
        value={teacherData.sex}
        aria-label="Default select example"
      >
        <option>пол</option>
        <option value="мужской">мужской</option>
        <option value="женский">женский</option>
      </Form.Select>
      <Form.Group controlId="duedate">
        <InputGroup.Text>дата рождения</InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, bornDate: e.target.value })
          }
          value={teacherData.bornDate}
          type="date"
          name="duedate"
          placeholder="Due date"
        />
      </Form.Group>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Место рождения
        </InputGroup.Text>
        <Form.Control
          onChange={(e) => {
            console.log(teacherData);
            setTeacherData({ ...teacherData, bornPlace: e.target.value });
          }}
          value={teacherData.bornPlace}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          место проживания по прописке
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, registration: e.target.value })
          }
          value={teacherData.registration}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          место фактического проживания
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, actualLiving: e.target.value })
          }
          value={teacherData.actualLiving}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          номер СНИЛС
        </InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            setTeacherData({ ...teacherData, SNILS: e.target.value })
          }
          value={teacherData.SNILS}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <>
        <Modal show={showEducation} onHide={() => setShowEducation(false)}>
          <h2>Образование</h2>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                номер свидетельства
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    certificationNumber: e.target.value,
                  })
                }
                value={educationData.certificationNumber}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                дата получения
              </InputGroup.Text>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    dataReceipt: e.target.value,
                  })
                }
                value={educationData.dataReceipt}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                наименование образовательного учреждения
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    universityName: e.target.value,
                  })
                }
                value={educationData.universityName}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                специальность
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setEducationData({
                    ...educationData,
                    speciality: e.target.value,
                  })
                }
                value={educationData.speciality}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="large"
              variant="contained"
              onClick={() => setShowEducation(false)}
            >
              Закрыть
            </Button>
            {isEditable ? (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  console.log(educationData);
                  console.log(teacherData.education);
                  setTeacherData({
                    ...teacherData,
                    education: teacherData.education.map((e) => {
                      if (e.id === educationData.id) {
                        return educationData;
                      }
                      return e;
                    }),
                  });
                }}
              >
                Изменить
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  alert("образование успешно добавлено");
                  setShowEducation(false);
                  setEducationData({ ...educationData, id: Date.now() });
                  setTeacherData({
                    ...teacherData,
                    education: [...teacherData.education, educationData],
                  });
                }}
              >
                Добавить образование
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal show={showCourse} onHide={() => setShowCourse(false)}>
          <h2>Курсы повышения квалификации</h2>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                номер курса
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  console.log("номер курса");
                  setCourseData({
                    ...courseData,
                    number: e.target.value,
                  });
                }}
                value={courseData.number}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                дата завершения
              </InputGroup.Text>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    dateEnd: e.target.value,
                  })
                }
                value={courseData.dateEnd}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                общее время прохождения
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    hours: e.target.value,
                  })
                }
                value={courseData.hours}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                специальность
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    speciality: e.target.value,
                  })
                }
                value={courseData.speciality}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="large"
              variant="contained"
              onClick={() => setShowCourse(false)}
            >
              Закрыть
            </Button>
            {isEditable ? (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  console.log(courseData);
                  console.log(teacherData.course);
                  setTeacherData({
                    ...teacherData,
                    course: teacherData.course.map((e) => {
                      if (e.id === courseData.id) {
                        return courseData;
                      }
                      return e;
                    }),
                  });
                }}
              >
                Изменить
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  alert("курс успешно добавлен");
                  setShowCourse(false);
                  setCourseData({ ...courseData, id: Date.now() });
                  setTeacherData({
                    ...teacherData,
                    course: [...teacherData.course, courseData],
                  });
                }}
              >
                Добавить курс
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal show={showLesson} onHide={() => setShowLesson(false)}>
          <h2>Предмет</h2>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Наименование предмета
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    name: e.target.value,
                  })
                }
                value={lessonData.name}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="large"
              variant="contained"
              onClick={() => setShowLesson(false)}
            >
              Закрыть
            </Button>
            {isEditable ? (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  console.log(lessonData);
                  console.log(teacherData.lesson);
                  setTeacherData({
                    ...teacherData,
                    lesson: teacherData.lesson.map((e) => {
                      if (e.id === lessonData.id) {
                        return lessonData;
                      }
                      return e;
                    }),
                  });
                }}
              >
                Изменить
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  alert("предмет успешно добавлен");
                  setShowLesson(false);
                  setLessonData({ ...lessonData, id: Date.now() });
                  setTeacherData({
                    ...teacherData,
                    lesson: [...teacherData.lesson, lessonData],
                  });
                }}
              >
                Добавить предмет
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal show={showFamily} onHide={() => setShowFamily(false)}>
          <h2>Состав семьи</h2>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Фамилия
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setFamilyData({
                    ...familyData,
                    surname: e.target.value,
                  })
                }
                value={familyData.surname}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Имя
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setFamilyData({
                    ...familyData,
                    name: e.target.value,
                  })
                }
                value={familyData.name}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Отчество
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setFamilyData({
                    ...familyData,
                    patronimyc: e.target.value,
                  })
                }
                value={familyData.patronimyc}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                родство
              </InputGroup.Text>
              <Form.Control
                onChange={(e) =>
                  setFamilyData({
                    ...familyData,
                    kinship: e.target.value,
                  })
                }
                value={familyData.kinship}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                дата рождения
              </InputGroup.Text>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFamilyData({
                    ...familyData,
                    bornDate: e.target.value,
                  })
                }
                value={familyData.bornDate}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="large"
              variant="contained"
              onClick={() => setShowFamily(false)}
            >
              Закрыть
            </Button>
            {isEditable ? (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  console.log(familyData);
                  console.log(teacherData.course);
                  setTeacherData({
                    ...teacherData,
                    family: teacherData.family.map((e) => {
                      if (e.id === familyData.id) {
                        return familyData;
                      }
                      return e;
                    }),
                  });
                }}
              >
                Изменить
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  alert("член семьи успешно добавлен");
                  setShowFamily(false);
                  setFamilyData({ ...familyData, id: Date.now() });
                  setTeacherData({
                    ...teacherData,
                    family: [...teacherData.family, familyData],
                  });
                }}
              >
                Добавить члена семьи
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            setIsEditble(false);
            setShowEducation(true);
          }}
        >
          Добавить образование
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            setIsEditble(false);
            setShowCourse(true);
          }}
        >
          Добавить курс
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            setIsEditble(false);
            setShowLesson(true);
          }}
        >
          Добавить предмет
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            setIsEditble(false);
            setShowFamily(true);
          }}
        >
          Добавить члена семьи
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        ></input>
        <Button
          onClick={() => inputFileRef.current.click()}
          size="large"
          variant="contained"
        >
          Добавить фото
        </Button>
      </div>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdditing ? "сохранить" : "создать запись"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
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
              {teacherData.education.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td>{index + 1}</td>
                    <td>{element.certificationNumber}</td>
                    <td>{element.dataReceipt}</td>
                    <td>{element.universityName}</td>
                    <td>{element.speciality}</td>
                    <IconButton color="secondary">
                      <DeleteIcon
                        onClick={(e) => {
                          setTeacherData({
                            ...teacherData,
                            education: teacherData.education.filter(
                              (e) => e.id !== element.id
                            ),
                          });
                        }}
                      />
                    </IconButton>
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() => {
                          console.log(element);
                          setEducationData(element);
                          setIsEditble(true);
                          setShowEducation(true);
                        }}
                      />
                    </IconButton>
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
              {teacherData.course.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.number}</td>
                    <td>{element.dateEnd}</td>
                    <td>{element.hours} (часов)</td>
                    <td>{element.speciality}</td>
                    <IconButton color="secondary">
                      <DeleteIcon
                        onClick={(e) => {
                          setTeacherData({
                            ...teacherData,
                            course: teacherData.course.filter(
                              (e) => e.id !== element.id
                            ),
                          });
                        }}
                      />
                    </IconButton>
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() => {
                          console.log(element);
                          setCourseData(element);
                          setIsEditble(true);
                          setShowCourse(true);
                        }}
                      />
                    </IconButton>
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
              {teacherData.lesson.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <IconButton color="secondary">
                      <DeleteIcon
                        onClick={(e) => {
                          setTeacherData({
                            ...teacherData,
                            lesson: teacherData.lesson.filter(
                              (e) => e.id !== element.id
                            ),
                          });
                        }}
                      />
                    </IconButton>
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() => {
                          console.log(element);
                          setLessonData(element);
                          setIsEditble(true);
                          setShowLesson(true);
                        }}
                      />
                    </IconButton>
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
              {teacherData.family.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.surname}</td>
                    <td>{element.name}</td>
                    <td>{element.patronimyc}</td>
                    <td>{element.kinship}</td>
                    <td>{element.bornDate}</td>
                    <IconButton color="secondary">
                      <DeleteIcon
                        onClick={(e) => {
                          setTeacherData({
                            ...teacherData,
                            family: teacherData.family.filter(
                              (e) => e.id !== element.id
                            ),
                          });
                        }}
                      />
                    </IconButton>
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() => {
                          console.log(element);
                          setFamilyData(element);
                          setIsEditble(true);
                          setShowFamily(true);
                        }}
                      />
                    </IconButton>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Paper>
  );
};
