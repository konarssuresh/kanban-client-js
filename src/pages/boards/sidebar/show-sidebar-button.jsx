import { clsx } from "clsx";
import { useAppStore } from "../../../store/useAppStore";
import IconShowSidebar from "../../../common-components/icons/IconShowSidebar";

const ShowSidebar = () => {
  const { toggleSidebar } = useAppStore();

  const buttonClasses = clsx({
    "absolute top-[75vh] px-2 py-2": true,
    "cursor-pointer": true,
    "bg-purple-700 text-white rounded-r-full": true,
  });

  return (
    <button onClick={toggleSidebar} className={buttonClasses}>
      <IconShowSidebar />
    </button>
  );
};

export default ShowSidebar;
