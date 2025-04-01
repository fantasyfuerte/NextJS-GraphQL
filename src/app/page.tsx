import FileUploader from "./components/file-uploader";

export default function Home() {
  return (
    <main>
      <section>
        <h1 className="text-xl text-center p-4 text-emerald-400 font-bold">
          NextJS + GraphQL
        </h1>
        <article className="text-center p-10 mx-40 lg:mx-64 my-5 border-emerald-400 border-b">
          <FileUploader />
        </article>
      </section>
    </main>
  );
}
