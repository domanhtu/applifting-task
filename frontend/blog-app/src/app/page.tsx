import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto w-11/12 lg:w-3/5 my-10 space-y-2">
      <h1 className="text-2xl font-semibold">Homepage</h1>
      <h2 className="text-xl font-medium">About</h2>
      <p>This is an blog app that serves as an exercise for Applifting. It is an Next 13 frontend framework app,
        that uses a backend provided by Applifting at https://fullstack.exercise.applifting.cz.
      </p>
    </div>
  );
}
