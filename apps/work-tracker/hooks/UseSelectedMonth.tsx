import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useSelectedMonth = () => {
  const {
    currentDateInformation: { CURRENT_DATE, CURRENT_MONTH, CURRENT_YEAR },
    selectedDateInformation: { SELECTED_YEAR, SELECTED_MONTH, SELECTED_DATE },
  } = useAppSelector(({ app }) => app);

  const getData = useCallback(() => {
    return {
      CURRENT_DATE,
      CURRENT_MONTH,
      CURRENT_YEAR,
      SELECTED_YEAR,
      SELECTED_MONTH,
      SELECTED_DATE,
      hello: "yes",
    };
  }, [
    CURRENT_DATE,
    CURRENT_MONTH,
    CURRENT_YEAR,
    SELECTED_YEAR,
    SELECTED_MONTH,
    SELECTED_DATE,
  ]);

  return { getData };
};
