import { useState } from "react";
import noop from "lodash/noop";

let showDialog = noop;

const DialogContainer = () => {
  const [view, setView] = useState(null);

  const handleSetView = (newView) => {
    setView(newView);

    return () => setView(null);
  };

  showDialog = handleSetView;

  return <>{view}</>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { showDialog, DialogContainer };
