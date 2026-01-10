import { clsx } from "clsx";

const AddColumn = () => {
  const containerClasses = clsx({
    "w-70 h-full flex justify-center items-center flex-shrink-0 bg-grey-300 cursor-pointer": true,
  });

  const buttonClasses = clsx({
    "text-xl text-grey-400 text-grey-400 cursor-pointer": true,
  });
  return (
    <div className={containerClasses}>
      <button className={buttonClasses}>+ New Column</button>
    </div>
  );
};

export default AddColumn;
