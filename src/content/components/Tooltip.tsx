export const Tooltip = ({
  word,
  meanings,
}: {
  word: string;
  meanings: string[];
}) => {
  return (
    <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-lg max-w-sm">
      <span className="inline-block mb-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
        Tailwind 적용됨 🎉
      </span>

      <strong className="text-black font-semibold block mb-1">{word}</strong>
      <ul className="pl-5 space-y-1">
        {meanings.map((meaning, idx) => (
          <li key={idx}>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                word
              )}+meaning`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {meaning}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
