import { clsx } from "clsx";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useAppStore } from "../../../store/useAppStore";
import LogoDark from "../../../common-components/icons/LogoDark";

import BoardsList from "./boards-list";
import HideSidebarButton from "./hide-sidebar-button";
import ShowSidebar from "./show-sidebar-button";

const Sidebar = () => {
  const { sidebarOpen } = useAppStore();

  if (!sidebarOpen) return <ShowSidebar />;

  const sidebarClasses = clsx({
    "flex flex-col gap-4 border-r border-grey-400 h-full": true,
  });

  const logoClasses = clsx({
    "text-purple-700": true,
  });

  const logoContainerClasses = clsx({
    "px-6 py-4": true,
  });

  return (
    <div className="w-65 lg:w-75 h-screen flex-none">
      <AnimatePresence>
        {sidebarOpen && (
          <Motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${sidebarClasses}`}
          >
            <div className={logoContainerClasses}>
              <LogoDark className={logoClasses} />
            </div>
            <BoardsList />
            <HideSidebarButton />
          </Motion.div>
        )}
      </AnimatePresence>
      {!sidebarOpen && <ShowSidebar />}
    </div>
  );
};

export default Sidebar;
