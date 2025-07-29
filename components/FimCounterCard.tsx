export default function FimCounterCard({ small = false }) {
  return (
    <div className={`p-4 rounded-xl shadow border text-center ${small ? 'h-[120px]' : 'h-[200px]'}`}>
      <h2 className="text-lg font-semibold text-gray-700">Total Count</h2>
      <p className={`font-bold ${small ? 'text-3xl' : 'text-5xl'} text-green-600 mt-2`}>9476</p>
    </div>
  );
}
