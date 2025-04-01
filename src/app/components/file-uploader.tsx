"use client";

interface Props {}

function FileUploader({}: Props) {
  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    console.log(file);
  }

  return (
    <form className=" flex flex-col items-center gap-5" onSubmit={Submit}>
      <input type="file" name="file" accept=".pdf" className="" />
      <button className="bg-emerald-100 px-4 py-2 rounded-lg hover:bg-emerald-300">
        Submit
      </button>
    </form>
  );
}

export default FileUploader;
