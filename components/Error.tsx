import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { IoAlertCircle } from "react-icons/io5";

export default function Error({error}:{error:string}) {
  return (
    <Alert variant="destructive">
      <IoAlertCircle className="h-6 w-6" />
      <AlertTitle className="font-semibold text-lg">Error</AlertTitle>
      <AlertDescription className="font-semibold ">{error}</AlertDescription>
    </Alert>
  );
}
