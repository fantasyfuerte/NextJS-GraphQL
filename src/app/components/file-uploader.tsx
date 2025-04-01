"use client";

import { useState } from "react";

interface Props {}

function FileUploader({}: Props) {
  enum StatusVariables {
    READY = "EMPTY",
    UPLOADING = "UPLOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    INITIAL = "INITIAL",
  }

  const [status, setStatus] = useState<StatusVariables>(
    StatusVariables.INITIAL
  );
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");

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
        const { filename } = await response.json();
        setFilename(filename);
        setStatus(StatusVariables.SUCCESS);
        setFile(file);
      } else {
        setStatus(StatusVariables.ERROR);
      }
    } catch (error) {
      setStatus(StatusVariables.ERROR);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setStatus(StatusVariables.READY);
    else setStatus(StatusVariables.INITIAL);
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
    <article className="flex flex-col items-center gap-5">
      <form onSubmit={Submit} className="flex flex-col items-center gap-5">
        <button
          className="text-center text-xl text-emerald-400 font-bold"
          type="button"
        >
          <label
            className="cursor-pointer hover:bg-black/10 p-2 my-4 rounded-lg hover:opacity-50 animate-pulse"
            htmlFor="file-input"
          >
            Sube un archivo PDF
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="file"
            accept=".pdf"
            id="file-input"
            className="hidden"
          />
        </button>
        {status !== StatusVariables.INITIAL && (
          <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
            {buttonText}
          </button>
        )}
      </form>
      {status == StatusVariables.SUCCESS && file && (
        <article>
          <p>Archivo subido con éxito</p>
          <p>Nombre del archivo: {filename}</p>
          <p>Tamaño del archivo: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </article>
      )}
    </article>
  );
}

export default FileUploader;
