import { clsx } from "clsx";
import { useAppStore } from "../../../store/useAppStore";
import LogoDark from "../../../common-components/Icons/LogoDark";

import BoardsList from "./boards-list";
import HideSidebarButton from "./hide-sidebar-button";
import ShowSidebar from "./show-sidebar-button";

const Sidebar = () => {
  const { sidebarOpen } = useAppStore();

  if (!sidebarOpen) return <ShowSidebar />;

  const sidebarClasses = clsx({
    "flex flex-col gap-4 border-r border-grey-400": true,
    "w-65": true,
    "lg:w-75": true,
  });

  const logoClasses = clsx({
    "text-purple-700": true,
  });

  const logoContainerClasses = clsx({
    "px-6 py-4": true,
  });

  return (
    <div className={`${sidebarClasses}`}>
      <div className={logoContainerClasses}>
        <LogoDark className={logoClasses} />
      </div>
      <BoardsList />
      <HideSidebarButton />
    </div>
  );
};

export default Sidebar;
