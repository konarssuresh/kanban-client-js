import Header from "./header";
import Content from "./content/content";

const BoardContent = () => {
  return (
    <div className="h-full w-full overflow-auto flex flex-col grow">
      <Header />
      <Content />
    </div>
  );
};

export default BoardContent;
