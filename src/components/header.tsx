import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeMod } from "../redux/app/appSlice";
import { useEffect } from "react";

function Header() {
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-bs-theme", mode);
    }
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React Redux</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={mode === "light" ? "Light Mode" : "Dark Mode"}
                value={mode}
                onChange={(e) =>
                  dispatch(
                    changeMod(e.target.value === "light" ? "dark" : "light"),
                  )
                }
              />
            </Form>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
