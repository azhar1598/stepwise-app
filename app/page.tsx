function Page() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl md:text-2xl text-center max-w-2xl opacity-80">
        We're working on something exciting. Stay tuned!
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Notify Me
        </button>
      </div>
    </main>
  );
}

export default Page;
