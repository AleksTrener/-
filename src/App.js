import React, { useState } from "react";

const App = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [lossPremium, setLossPremium] = useState("");
  const [results, setResults] = useState(null);
  const [fullReceipt, setFullReceipt] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFullReceipt, setShowFullReceipt] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const hr = parseFloat(hourlyRate) || 0;
      const hw = parseFloat(hoursWorked) || 0;
      const lp = parseFloat(lossPremium) || 0;

      const priropatokPercent = 0.1;
      const premia50 = 0.5;
      const premia45 = 0.45;
      const safetyPercent = 0.2;
      const rcPercent = 0.15;
      const taxPercent = 0.13;

      // С приработком
      const tariff = hr * hw;
      const priropatok = tariff * priropatokPercent;
      const baseForPremia = tariff + priropatok;
      const prem50 = baseForPremia * premia50;
      const prem45 = baseForPremia * premia45;
      const safety = tariff * safetyPercent;
      const baseForRc = tariff + priropatok + prem50 + prem45 + safety + lp;
      const rc = baseForRc * rcPercent;
      const gross = baseForRc + rc;
      const tax = gross * taxPercent;
      const net = gross - tax;

      // Без приработока
      const prem50Without = tariff * premia50;
      const prem45Without = tariff * premia45;
      const safetyWithout = tariff * safetyPercent;
      const baseForRcWithout =
        tariff + prem50Without + prem45Without + safetyWithout + lp;
      const rcWithout = baseForRcWithout * rcPercent;
      const grossWithout = baseForRcWithout + rcWithout;
      const taxWithout = grossWithout * taxPercent;
      const netWithout = grossWithout - taxWithout;

      setResults({
        with: {
          gross: gross.toFixed(2),
          tax: tax.toFixed(2),
          net: net.toFixed(2),
        },
        without: {
          gross: grossWithout.toFixed(2),
          tax: taxWithout.toFixed(2),
          net: netWithout.toFixed(2),
        },
      });

      setFullReceipt({
        with: [
          { name: "Тарифная ставка", value: tariff },
          { name: "Приработок (10%)", value: priropatok },
          { name: "Премия 50%", value: prem50 },
          { name: "Премия 45%", value: prem45 },
          { name: "Премия за потери рабочего времени", value: lp },
          { name: "Надбавка за безопасный труд", value: safety },
          { name: "Районный коэффициент (15%)", value: rc },
          { name: "Итого начислено", value: gross },
          { name: "НДФЛ (13%)", value: tax },
          { name: "К выплате", value: net },
        ],
        without: [
          { name: "Тарифная ставка", value: tariff },
          { name: "Премия 50%", value: prem50Without },
          { name: "Премия 45%", value: prem45Without },
          { name: "Премия за потери рабочего времени", value: lp },
          { name: "Надбавка за безопасный труд", value: safetyWithout },
          { name: "Районный коэффициент (15%)", value: rcWithout },
          { name: "Итого начислено", value: grossWithout },
          { name: "НДФЛ (13%)", value: taxWithout },
          { name: "К выплате", value: netWithout },
        ],
      });

      setIsCalculating(false);
    }, 600);
  };

  const renderTable = (data, title) => (
    <div
      className={`rounded-xl border shadow-md p-4 mt-4 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } overflow-hidden`}
    >
      <h3 className="font-semibold text-sm sm:text-base text-blue-600 dark:text-blue-400 mb-2">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-xs sm:text-sm min-w-max">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <th className="text-left px-2 py-1">Наименование</th>
              <th className="text-right px-2 py-1">Сумма (₽)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                className={`transition-all duration-300 hover:bg-opacity-10 ${
                  idx % 2 === 0 ? "" : darkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <td className="px-2 py-1 whitespace-nowrap">{item.name}</td>
                <td className="px-2 py-1 text-right font-medium whitespace-nowrap">
                  {parseFloat(item.value).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800"
      } relative overflow-hidden font-sans`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-80 -left-80 w-96 h-96 bg-gradient-to-tr from-red-400/20 to-yellow-400/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white mix-blend-overlay"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${
              5 + Math.random() * 5
            }s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      {/* Mobile Container */}
      <div className="container mx-auto px-4 py-6 md:py-12 relative z-10 max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-lg">
            Калькулятор зарплаты
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Input Card */}
        <div
          className={`rounded-2xl shadow-xl backdrop-blur-sm border overflow-hidden transition-all duration-500 ${
            darkMode
              ? "bg-gray-800/90 border-gray-700 shadow-gray-900/20"
              : "bg-white/90 border-gray-100 shadow-purple-200/50"
          }`}
        >
          {/* Top Gradient Strip */}
          <div
            className={`px-4 py-3 ${
              darkMode
                ? "bg-gradient-to-r from-indigo-900 to-purple-900"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            } text-white shadow-lg`}
          >
            <h2 className="text-sm md:text-xl font-bold">Введите данные</h2>
            <p className="text-xs opacity-90 mt-1">Для расчёта зарплаты</p>
          </div>

          {/* Inputs */}
          <div className="p-4 space-y-4">
            {[
              {
                id: "hourlyRate",
                label: "Тарифная ставка (₽/ч)",
                value: hourlyRate,
                setValue: setHourlyRate,
                placeholder: "Например, 154.70",
              },
              {
                id: "hoursWorked",
                label: "Отработано часов",
                value: hoursWorked,
                setValue: setHoursWorked,
                placeholder: "Например, 151",
              },
              {
                id: "lossPremium",
                label: "Премия за потери (₽)",
                value: lossPremium,
                setValue: setLossPremium,
                placeholder: "Например, 424.29",
              },
            ].map((field) => (
              <div key={field.id} className="space-y-1">
                <label
                  htmlFor={field.id}
                  className="block text-xs font-medium opacity-80"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="number"
                  step="0.01"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-4 focus:outline-none text-sm ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 focus:ring-blue-500/50"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500/50"
                  }`}
                />
              </div>
            ))}

            {/* Calculate Button */}
            <button
              onClick={calculate}
              disabled={isCalculating}
              className={`mt-2 w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isCalculating ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isCalculating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Рассчитываем...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Рассчитать
                </>
              )}
            </button>
          </div>

          {/* Results Summary */}
          {results && (
            <div
              className={`result-section p-4 border-t ${
                darkMode
                  ? "bg-gray-800/70 border-gray-700"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <h2 className="text-xs sm:text-sm md:text-xl font-bold mb-3 flex items-center gap-2">
                <span className="inline-block w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></span>
                Результаты расчёта
              </h2>

              <div className="grid grid-cols-1 gap-3">
                <div
                  className={`p-3 rounded-lg border shadow-sm ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-2">
                    С приработком:
                  </h3>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between">
                      <span>Грязными:</span>
                      <span>{results.with.gross} ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span>НДФЛ (13%):</span>
                      <span>{results.with.tax} ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span>На руки:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {results.with.net} ₽
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  className={`p-3 rounded-lg border shadow-sm ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-2">
                    Без приработка:
                  </h3>
                  <ul className="space-y-1 text-xs">
                    <li className="flex justify-between">
                      <span>Грязными:</span>
                      <span>{results.without.gross} ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span>НДФЛ (13%):</span>
                      <span>{results.without.tax} ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span>На руки:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {results.without.net} ₽
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Toggle Full Receipt */}
              {fullReceipt && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowFullReceipt(!showFullReceipt)}
                    className={`w-full py-2 px-4 rounded text-xs sm:text-sm font-medium transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {showFullReceipt
                      ? "Скрыть полный квиток"
                      : "Показать полный квиток"}
                  </button>

                  {showFullReceipt && (
                    <div className="mt-2 overflow-hidden">
                      {renderTable(fullReceipt.with, "С приработком (10%)")}
                      {renderTable(fullReceipt.without, "Без приработка")}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div
            className={`mt-6 text-center text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            &copy; 2025 Официально. Все права защищены. Автор: Александров
            Александр
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
