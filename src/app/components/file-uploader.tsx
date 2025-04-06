"use client";

import { useState } from "react";
import { SlTrash } from "react-icons/sl";

// to-dos
// recuperar los archivos ✅
// mostrar la lista de archivos antes de subir ✅
// habilitar la funcion de eliminar archivos antes de subir ✅
// validar filetype ✅
// pasar los archivos a api/upload ✅
// renderizados condicionales ✅
// agrupar los archivos denegados ✅

enum APP_STATUS {
  INITIAL = "initial",
  READY = "ready",
  UPLOADING = "uploading",
  ERROR = "error",
  SUCCESS = "success",
}

function FileUploader() {
  const [appStatus, setAppStatus] = useState<APP_STATUS>(APP_STATUS.INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [wrongFiles, setWrongFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>();

  function addFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) {
      setAppStatus(APP_STATUS.INITIAL);
      return;
    }
    setFiles([...e.target.files]);
    setAppStatus(APP_STATUS.READY);
  }
  function removeFile(fileToDelete: File) {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
    if (files.length == 1) setAppStatus(APP_STATUS.INITIAL);
  }

  function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    for (const file of files) {
      if (
        file.name.split(".")[1] !== "xlsx" ||
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setWrongFiles((prev) => [...prev, file]);
        continue;
      }
      data.append("file", file);
    }
    if (data.getAll("file").length == 0) {
      setAppStatus(APP_STATUS.ERROR);
      setFiles([]);
      return;
    }
    setAppStatus(APP_STATUS.UPLOADING);
    try {
      fetch("/api/upload", { method: "POST", body: data })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setMessage(data.message);
        });
      setAppStatus(APP_STATUS.SUCCESS);
    } catch (e) {
      setAppStatus(APP_STATUS.ERROR);
      setMessage("Error uploading file");
    }
  }

  return (
    <article className="flex flex-col items-center gap-4">
      {appStatus == APP_STATUS.INITIAL || appStatus == APP_STATUS.READY ? (
        <form className="flex flex-col items-center" onSubmit={Submit}>
          <input
            type="file"
            multiple
            accept=".xlsx"
            id="input-file"
            className="hidden"
            onChange={addFiles}
          ></input>
          {appStatus == APP_STATUS.INITIAL ? (
            <label
              className="px-3 py-2 font-semibold bg-emerald-200 rounded-xl text-black/90 hover:bg-emerald-200/70 hover:cursor-pointer text-center w-fit mb-4"
              htmlFor="input-file"
            >
              Select files
            </label>
          ) : (
            <div className="flex flex-col w-[85vh]">
              <button className="px-3 py-2 font-semibold bg-emerald-200 rounded-xl text-black/90 hover:bg-emerald-200/70 hover:cursor-pointer text-center w-fit mb-4 self-center">
                Upload
              </button>
              <ul>
                {files.map((file) => (
                  <li
                    className="flex justify-between items-center my-2"
                    key={file.name + file.size}
                  >
                    <div>
                      <p>
                        Name: <strong>{file.name}</strong>{" "}
                      </p>
                      <p>
                        Size:{" "}
                        <strong>
                          {(file.size / 1024 / 1024).toFixed(2)}MB
                        </strong>
                      </p>
                    </div>
                    <button
                      className="hover:opacity-70"
                      onClick={() => removeFile(file)}
                    >
                      <SlTrash size={30} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      ) : (
        <ul>
          <p className="font-semibold">{wrongFiles.length} files rejected</p>
          {wrongFiles.map((file) => (
            <li
              className="flex justify-start items-center my-2"
              key={file.name + file.size}
            >
              <div>
                <p>
                  Name: <strong className="text-red-900">{file.name}</strong>{" "}
                </p>
                <p>
                  Size:{" "}
                  <strong className="text-red-900">
                    {(file.size / 1024 / 1024).toFixed(2)}MB
                  </strong>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {(appStatus == APP_STATUS.SUCCESS || appStatus == APP_STATUS.ERROR) && (
        <div>
          <p className="text-xl font-semibold">{message}</p>
          {appStatus == APP_STATUS.ERROR && (
            <button
              className="px-3 py-2 font-semibold bg-red-200 rounded-xl text-black/90 hover:bg-emerald-200/70 hover:cursor-pointer text-center w-fit mb-4 self-center"
              onClick={() => setAppStatus(APP_STATUS.INITIAL)}
            >
              Try again
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default FileUploader;
