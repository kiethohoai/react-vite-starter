import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UsersTable from "./UsersTable";
import "./TableContent.css";
import { useState } from "react";
import Blogs from "./Blogs";

function TabsContent() {
  const [isShowAddNew, setIsShowAddNew] = useState(false);

  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3 mt-3"
    >
      <Tab eventKey="users" title="Users">
        <button
          className="add-new-user btn btn-outline-primary mb-2"
          onClick={() => setIsShowAddNew(true)}
        >
          Add New User
        </button>
        <UsersTable
          isShowAddNew={isShowAddNew}
          setIsShowAddNew={setIsShowAddNew}
        />
      </Tab>
      <Tab eventKey="blogs" title="Blogs">
        <Blogs />
      </Tab>
    </Tabs>
  );
}

export default TabsContent;
