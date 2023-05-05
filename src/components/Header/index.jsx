import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout } from "../../redux/slices/auth";
import admin from "../../admin.json";
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    console.log(userData);
    console.log(admin);
  }, []);
  const onClickLogout = () => {
    if (window.confirm("вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MALAKHOV UCHET</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {admin.adminEmail === userData.email ? (
                  <>
                    {" "}
                    <Link to="/add-post">
                      <Button variant="contained">Создать запись</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="contained">Создать пользователя</Button>
                    </Link>
                  </>
                ) : (
                  <div></div>
                )}
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
