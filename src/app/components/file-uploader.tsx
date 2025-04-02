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

  // Hacer algo con graphQL
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
      // const formData = new FormData()
      // formData.append("file",file)
      const response = await fetch(
        `api/upload/?file=${encodeURIComponent(file.name)}`,
        { method: "POST", body: formData }
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      setStatus(StatusVariables.INITIAL);
      return;
    }
    setStatus(StatusVariables.READY);
    setFile(e.target.files[0]);
  }

  const buttonText =
    status === StatusVariables.READY ? "Subir Archivo" : "Subiendo...";

  return (
    <article className="flex flex-col items-center gap-5">
      <form onSubmit={Submit} className="flex flex-col items-center gap-5">
        <button
          className="text-center text-xl text-emerald-400 font-bold"
          type="button"
        >
          {status == StatusVariables.INITIAL && (
            <label
              className="cursor-pointer hover:bg-black/10 p-2 my-4 rounded-lg hover:opacity-50 animate-pulse"
              htmlFor="file-input"
            >
              Sube un archivo PDF
            </label>
          )}
          <input
            onChange={handleChange}
            type="file"
            name="file"
            accept=".pdf"
            id="file-input"
            className="hidden"
          />
        </button>
        {(status == StatusVariables.READY ||
          status == StatusVariables.UPLOADING) && (
          <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
            {buttonText}
          </button>
        )}
      </form>
      {status == StatusVariables.UPLOADING && (
        <p className="text-3xl font-bold animate-spin">C</p>
      )}
      {(status == StatusVariables.READY || status == StatusVariables.SUCCESS) &&
        file && (
          <article>
            <p>
              Archivo {status == StatusVariables.SUCCESS ? "subido" : "cargado"}{" "}
              con éxito
            </p>
            <p>
              Nombre del archivo:{" "}
              <strong className="text-emerald-800">
                {file.name.split(".")[0]}
              </strong>
            </p>
            <p>
              Tamaño del archivo:{" "}
              <strong className="text-emerald-800">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </strong>
            </p>
          </article>
        )}
    </article>
  );
}

export default FileUploader;
