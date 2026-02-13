import { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";

export const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar visible only on large screens */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="flex-1 mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};
