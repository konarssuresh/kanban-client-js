import { clsx } from "clsx";
import { useAppStore } from "../../../store/useAppStore";
import IconHideSidebar from "../../../common-components/icons/IconHideSidebar";

const HideSidebarButton = () => {
  const { toggleSidebar } = useAppStore();

  const buttonClasses = clsx({
    "px-6 py-4 cursor-pointer hover:bg-grey-200": true,
    "text-grey-400": true,
    "flex items-center gap-4 text-md": true,
  });

  return (
    <button className={buttonClasses} onClick={toggleSidebar}>
      <IconHideSidebar />
      <span>Hide Sidebar</span>
    </button>
  );
};

export default HideSidebarButton;
