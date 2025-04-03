"use client";

import { useState } from "react";

function FileUploader() {
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
  const [files, setFiles] = useState<File[]>([]);

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("file") as File[];

    files.forEach((file) => {
      if (!file || file.type !== "application/pdf") {
        setStatus(StatusVariables.ERROR);
        return;
      }
    });

    setStatus(StatusVariables.UPLOADING);
    try {
      const response = await fetch(`api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setStatus(StatusVariables.ERROR);
        return;
      }
      setStatus(StatusVariables.SUCCESS);
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
    setFiles([...e.target.files]);
  }

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
            multiple
          />
        </button>
        {(status == StatusVariables.READY ||
          status == StatusVariables.UPLOADING) && (
          <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
            {status === StatusVariables.READY ? "Subir Archivo" : "Subiendo..."}
          </button>
        )}
      </form>
      {status == StatusVariables.UPLOADING && (
        <p className="text-3xl font-bold animate-spin">C</p>
      )}
      {(status == StatusVariables.READY || status == StatusVariables.SUCCESS) &&
        files && (
          <ul className="flex flex-col gap-2 w-1/2 mt-12">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between text-left">
                <div>
                  <p>
                    Nombre:{" "}
                    <strong className="text-emerald-800">
                      {file.name.split(".")[0]}
                    </strong>
                  </p>
                  <p>
                    Tamaño:{" "}
                    <strong className="text-emerald-800">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </strong>
                  </p>
                </div>
                <button className="hover:opacity-65 font-black ">X</button>
              </li>
            ))}
          </ul>
        )}
    </article>
  );
}

export default FileUploader;
