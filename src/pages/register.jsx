import { useState } from "react";
import { register } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password).then(() => navigate("/"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen max-w-xl mx-auto  flex flex-col pt-10  gap-y-4 p-4"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          E-posta
        </label>
        <div className=" mt-2 rounded-md shadow-sm">
          <input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Parola
        </label>
        <div className=" mt-2 rounded-md shadow-sm">
          <input
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="......"
          />
        </div>
      </div>

      <Link to={"/login"}>
        Hesabınız var mı?{" "}
        <span className=" font-bold text-blue-500">Giriş Yap</span>
      </Link>

      <div className=" flex gap-3">
        <button
          disabled={!email || !password}
          className="inline-flex items-center   cursor-pointer px-4 py-2 border border-transparent bg-blue-700 rounded-md text-white"
          type="submit"
        >
          Kayıt Ol
        </button>
        <Link to={"/"}>
          <button
            type="bbutton"
            className="inline-flex items-center   cursor-pointer px-4 py-2 border border-transparent bg-blue-400 rounded-md text-white"
          >
            Anasayfaya Dön
          </button>
        </Link>
      </div>
    </form>
  );
}
