import { useState, useCallback, useEffect } from "react";
import { Copy } from "lucide-react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [generated, setGenerated] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    if (generated) {
      passwordGenerator();
    }
  }, [length, numberAllowed, charAllowed, generated, passwordGenerator]);

  const handleGenerateClick = () => {
    passwordGenerator();
    setGenerated(true);
  };

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      alert("Copied!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-900 px-4 py-6">
      {/* Main Content */}
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-white text-center mb-6">
            🔐 Password Generator
          </h1>

          {/* Password Field */}
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md border border-gray-300 mb-4">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click generate to create password"
              className="flex-1 px-4 py-2 text-gray-800 outline-none text-lg bg-transparent"
            />

            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="h-full px-4 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
              <Copy size={18} />
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Length */}
            <div>
              <label className="text-sm text-gray-300 block mb-1">
                Length: <span className="text-white">{length}</span>
              </label>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex justify-between text-sm text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                Numbers
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                Symbols
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateClick}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Generate Password
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-6">
        <div className="space-y-1">
          <p>&copy; 2026 Password Generator. All Rights Reserved.</p>

          <p>
            Designed & Developed by:
            <br />
            <a
              href="https://github.com/sutanjoyb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white inline-flex items-center gap-1"
            >
              <i className="fa-brands fa-github"></i>
              Sutanjoy Bhattacharjee
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
