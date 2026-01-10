import { clsx } from "clsx";
import { useAppStore } from "../../../store/useAppStore";
import { useBoardStore } from "../../../store/useBoardStore";
import LogoDark from "../../../common-components/icons/LogoDark";
import IconVerticalEllipsis from "../../../common-components/icons/IconVerticalEllipsis";
import { Button } from "../../../common-components/button";

const Header = () => {
  const { sidebarOpen } = useAppStore();
  const { selectedBoard } = useBoardStore();
  const headerClasses = clsx({
    "h-20 w-full border-b border-grey-400": true,
    "flex items-center justify-between p-4": true,
  });
  const titleContainer = clsx({
    "flex items-start gap-4": true,
  });

  const logoClasses = clsx({
    "text-purple-700": true,
  });

  const titleClasses = clsx({
    "text-xl font-bold text-black": true,
  });

  const addTaskContainer = clsx({
    "flex items-center gap-3": true,
  });

  return (
    <div className={headerClasses}>
      <div className={titleContainer}>
        {!sidebarOpen && <LogoDark className={logoClasses} />}
        <h2 className={titleClasses}>{selectedBoard?.name}</h2>
      </div>

      <div className={addTaskContainer}>
        <Button variant="primary" size="large">
          + Add New Task
        </Button>
        <IconVerticalEllipsis className="text-grey-400" />
      </div>
    </div>
  );
};

export default Header;
