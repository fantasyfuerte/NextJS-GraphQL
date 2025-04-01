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
    if (!file || file.type !== "application/pdf") {
      setStatus(StatusVariables.ERROR);
      return;
    }
    setStatus(StatusVariables.UPLOADING);
    try {
      const response = await fetch(
        `api/upload/?file=${encodeURIComponent(file.name)}`,
        { method: "POST" }
      );
      if (response.status === 200) {
        setStatus(StatusVariables.SUCCESS);
      } else {
        setStatus(StatusVariables.ERROR);
      }
    } catch (error) {
      setStatus(StatusVariables.ERROR);
    }
  }
  const buttonText =
    status === StatusVariables.READY
      ? "Subir Archivo"
      : status === StatusVariables.UPLOADING
      ? "Subiendo..."
      : status === StatusVariables.SUCCESS
      ? "Archivo Subido"
      : "Intentar de nuevo";

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={Submit}>
      <button
        className="text-center text-xl text-emerald-400 font-bold"
        type="button"
      >
        <label className="cursor-pointer hover:opacity-50" htmlFor="file-input">
          Sube un archivo PDF
        </label>
        <input
          type="file"
          name="file"
          accept=".pdf"
          id="file-input"
          className="hidden"
        />
      </button>
      <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
        {buttonText}
      </button>
    </form>
  );
}

export default FileUploader;
