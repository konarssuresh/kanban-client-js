import { clsx } from "clsx";
import { Button } from "../../../../common-components/button";

const EmptyBoard = () => {
  const containerClasses = clsx({
    "w-full h-full flex flex-col items-center justify-center gap-3": true,
  });
  return (
    <div className={containerClasses}>
      <p className="text-lg">
        This board is empty. Create a new column to get started.
      </p>
      <Button variant="primary" size="large">
        + Add New Column
      </Button>
    </div>
  );
};

export default EmptyBoard;
