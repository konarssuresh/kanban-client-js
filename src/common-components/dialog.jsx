import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { motion as Motion } from "motion/react";
import { Button } from "./button";

const Dialog = ({ title, children, onClose, actions }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = function (e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      } else if (e.key === "Escape") {
        console.log("escape pressed");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-1300 flex justify-center items-center ">
      {/* overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      />
      {/* content */}
      <Motion.div
        layout
        ref={dialogRef}
        className="neutral bg-white flex flex-col z-1301 min-w-120 max-h-[80vh] overflow-y-auto rounded-lg m-4"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="p-5 flex flex-row gap-x-4 items-start">
          <div className="flex flex-col gap-[6px]">
            <h4 className="text-black text-lg font-bold">{title}</h4>
            {children}
          </div>
        </div>
        <hr className="text-neutral-100" />
        <div className="py-4 px-5 flex justify-end gap-x-4">
          {actions?.map((action) => {
            return (
              <Button
                key={action.text}
                variant={action.variant}
                onClick={action.onClick}
              >
                {action.text}
              </Button>
            );
          })}
        </div>
      </Motion.div>
    </div>
  );
};

export const ModalDialog = ({
  open,
  title,
  children,
  onClose,
  actions,
  icon,
  ...remaining
}) => {
  return (
    <>
      {open &&
        createPortal(
          <Dialog
            title={title}
            children={children}
            onClose={onClose}
            actions={actions}
            icon={icon}
            {...remaining}
          />,
          document.getElementById("modal-dialog")
        )}
    </>
  );
};
