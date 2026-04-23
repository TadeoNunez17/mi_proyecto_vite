import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_DATA_START } from "../../../redux/thunks";
import InstitutesTable from "../tables/InstitutesTable";

export default function InstitutesTab() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_DATA_START());
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <InstitutesTable refetchData={() => dispatch(GET_DATA_START())} />
    </Box>
  );
}