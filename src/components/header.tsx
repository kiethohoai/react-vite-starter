import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../hooks";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Header() {
  const users = useAppSelector((state) => state.user.listUsers);
  const [mode, setMode] = useState(false);

  return (
    <Navbar
      className="bg-body-tertiary"
      data-bs-theme={mode === false ? "light" : "dark"}
    >
      <Container>
        <Navbar.Brand href="#home">React Redux</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={mode === true ? "Dark Mode" : "Light Mode"}
                onChange={(e) => setMode(e.target.checked)}
              />
            </Form>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
