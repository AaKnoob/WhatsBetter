const Card = () => {
  return (
    <div className="border p-4 rounded-xl shadow-xl hover:shadow-lg hover:bg-blue-200">
      <p>Artist name</p>
      <p className="font-semibold text-2xl">Title of song or album</p>
      <button type="button" className="w-full bg-black text-white p-2 rounded-md mt-6">
        ❤️‍🔥 I like this
      </button>
    </div>
  );
};

export default Card;
