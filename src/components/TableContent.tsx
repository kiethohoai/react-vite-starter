import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UsersTable from "./UsersTable";

function TabsContent() {
  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3 mt-3"
    >
      <Tab eventKey="users" title="Users">
        <UsersTable />
      </Tab>
      <Tab eventKey="blogs" title="Blogs">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}

export default TabsContent;
