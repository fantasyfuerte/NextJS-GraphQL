import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify- gap-5">
      <h1 className="text-3xl font-bold underline">NextJS GraphQL</h1>
      <p className="text-xl">
        NextJS & GraphQL is a great combination for building modern web
        applications.
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSg1rLbeOW7TGvpK6jxXzyfTJiT7nN3oKa1w&s"
        alt="NextJS GraphQL"
        width={500}
        height={300}
      />
      <p className="text-xl">
        This project is a simple example of how to use GraphQL with NextJS.
      </p>
      <p className="text-xl">
        <a
          className="text-blue-500 underline"
          href="https://nextjs.org/docs/basic-features/data-fetching"
        >
          NextJS Data Fetching
        </a>
      </p>
      <p className="text-xl">
        <a
          className="text-blue-500 underline"
          href="https://graphql.org/learn/"
        >
          GraphQL
        </a>
      </p>
    </main>
  );
}
