"use client";

import { useState } from "react";

function FileUploader() {
  enum StatusVariables {
    READY = "READY",
    UPLOADING = "UPLOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    INITIAL = "INITIAL",
  }

  const [status, setStatus] = useState<StatusVariables>(
    StatusVariables.INITIAL
  );
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    for (const file of files) {
      if (
        !file ||
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setStatus(StatusVariables.ERROR);
        setMessage("File must be an xlsx file");
        setFiles([]);
        return;
      }
    }
    setStatus(StatusVariables.UPLOADING);

    try {
      const response = await fetch(`api/upload`, {
        method: "POST",
        body: JSON.stringify(files),
      });
      response.json().then((data) => {
        setMessage(data.message);
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

  function removeFile(file: File) {
    setFiles(files.filter((f) => f.name !== file.name || f.size !== file.size));
    if (files.length === 0) setStatus(StatusVariables.INITIAL);
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
              className="cursor-pointer hover:bg-black/10 p-3 my-4 rounded-lg hover:opacity-50 animate-pulse"
              htmlFor="file-input"
            >
              Upload and{" "}
              <span className="text-emerald-800 underline underline-offset-2">
                xlsx
              </span>{" "}
              file
            </label>
          )}
          <input
            onChange={handleChange}
            type="file"
            name="file"
            accept=".xlsx"
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
      {status == StatusVariables.READY && files && (
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
              <button
                onClick={() => removeFile(file)}
                className="hover:opacity-65 font-black "
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-3xl font-bold">{message}</p>
      {status == StatusVariables.ERROR && (
        <button
          onClick={() => setStatus(StatusVariables.INITIAL)}
          className="bg-red-100 px-4 py-2 rounded-lg hover:bg-red-300"
        >
          Try again
        </button>
      )}
    </article>
  );
}

export default FileUploader;
