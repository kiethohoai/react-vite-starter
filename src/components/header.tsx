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
      body.setAttribute("data-bs-theme", mode === false ? "light" : "dark");
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
                label={mode === false ? "Light Mode" : "Dark Mode"}
                defaultChecked={mode}
                onChange={(e) => dispatch(changeMod(e.target.checked))}
              />
            </Form>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
