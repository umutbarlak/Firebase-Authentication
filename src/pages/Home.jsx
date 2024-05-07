import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth, logout } from "../../firebase";
import { logout as logoutHandle } from "./../store/auth";
import UpdateProfile from "../components/UpdateProfile";

import { useEffect, useState } from "react";
import {
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const [user, setuser] = useState();

  const emailVerify = () => {
    sendEmailVerification(user).then(() => {
      toast.success("E-posta doğrulama gönderildi");
    });
  };

  const handleDelete = () => {
    deleteUser(user).then(() => toast.success("Kullanıcı silindi"));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setuser(user);
    });
  }, [user]);

  const handleLogout = async () => {
    console.log("çıkış yapıldı");
    await logout();
    dispatch(logoutHandle("/login"));
  };
  console.log(user);

  if (user) {
    return (
      <div className=" flex  flex-col   gap-3 justify-center items-center  px-4">
        <div className="flex  flex-wrap gap-3 justify-center items-center mt-10">
          <h1>Oturumun Açık ({user.email})</h1>

          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className=" py-2 px-4 bg-red-600  text-white rounded-md"
            >
              Çıkış Yap
            </button>
            {!user.emailVerified && (
              <button
                onClick={emailVerify}
                className=" py-2 px-4 bg-red-600  text-white rounded-md"
              >
                E-posta Onayla
              </button>
            )}
            <button
              onClick={handleDelete}
              className=" py-2 px-4 bg-red-600  text-white rounded-md"
            >
              Kullanıcıyı Sil
            </button>
          </div>
        </div>

        <div className=" flex gap-3 items-center">
          {user.photoURL !== null ? (
            <img
              className=" w-12 h-12 rounded-full"
              src={user.photoURL}
              alt=""
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-500"></div>
          )}
          <h1>Ad Soyad: {user.displayName && user.displayName}</h1>
        </div>

        <UpdateProfile user={user} setUser={setuser} />
      </div>
    );
  }

  return (
    <div className=" flex flex-col h-screen justify-center items-center gap-3">
      <div className="flex flex-col  justify-center items-center gap-3 bg-gray-200 md:rounded-lg h-full w-full md:h-[600px] md:w-[600px] py-40 px-20 ">
        <h1 className=" text-xl font-bold">Kullanıcı Sayfamıza Hoş Geldiniz</h1>
        <div className="flex  gap-3 ">
          <Link className=" px-4 py-2 rounded-md bg-blue-200" to={"/register"}>
            Kayıt Ol
          </Link>
          <Link className=" px-4 py-2 rounded-md bg-blue-400" to={"/login"}>
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
