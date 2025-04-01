import FileUploader from "./components/file-uploader";

export default function Home() {
  return (
    <main>
      <section className="mt-16">
        <h1 className="text-xl text-center p-4 text-emerald-400 font-bold">
          NextJS + GraphQL
        </h1>
        <article className="text-center p-10 my-5 border-emerald-400 border-b w-1/2 mx-auto">
          <FileUploader />
        </article>
      </section>
    </main>
  );
}
