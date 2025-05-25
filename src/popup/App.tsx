import { DevNotice } from "@/popup/components/DevNotice";

export default function App() {
  return (
    <div className="p-8 min-w-[350px] min-h-[260px] flex flex-col items-center justify-center bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Parapara</h1>
      <DevNotice />
    </div>
  );
}
