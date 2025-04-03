import FileUploader from "./components/file-uploader";

export default function Home() {
  return (
    <main>
      <section className="mt-16">
        <h1 className="text-xl text-center p-4 text-emerald-400 font-bold">
          NextJS + Excel
        </h1>
        <p className="text-center text-pretty mb-20 opacity-65 font-semibold">
          Upload an .xlsx file. Use the button below.
        </p>
        <FileUploader />
      </section>
    </main>
  );
}
