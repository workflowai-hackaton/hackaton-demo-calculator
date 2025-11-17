import Calculator from './components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
          Basic Calculator
        </h1>
        <Calculator />
      </div>
    </div>
  );
}
