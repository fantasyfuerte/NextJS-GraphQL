"use client";

import { useState } from "react";

interface Props {}

function FileUploader({}: Props) {
  enum StatusVariables {
    READY = "EMPTY",
    UPLOADING = "UPLOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
  }

  const [status, setStatus] = useState<StatusVariables>(StatusVariables.READY);

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    if (!file || file.type !== "application/pdf")
      setStatus(StatusVariables.ERROR);
    setStatus(StatusVariables.UPLOADING);
  }

  const buttonText =
    status === StatusVariables.READY
      ? "Subir Archivo"
      : status === StatusVariables.UPLOADING
      ? "Subiendo..."
      : status === StatusVariables.SUCCESS
      ? "Archivo Subido"
      : "Error";

  return (
    <form className=" flex flex-col items-center gap-5" onSubmit={Submit}>
      <input type="file" name="file" accept=".pdf" className="" />
      <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
        {buttonText}
      </button>
    </form>
  );
}

export default FileUploader;
