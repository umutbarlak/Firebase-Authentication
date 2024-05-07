import { useState } from "react";
import { update } from "../../firebase";
import { useDispatch } from "react-redux";
import { updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

const UpdateProfile = ({ user, setUser }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(null);
  const [newPass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    update({
      displayName,
      photoURL: avatar,
    }).then(() => {
      setAvatar("");
      setDisplayName("");
      setUser({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    });
  };

  const handleChangePass = async (e) => {
    e.preventDefault();

    await updatePassword(user, newPass)
      .then(() => {
        toast.success("Şifre güncellendi");
      })
      .catch((err) => toast.error(err.message));
    setPass("");
  };

  return (
    <div className=" w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="w-full  max-w-xl mx-auto  mt-10  flex flex-col gap-y-4 mb-5"
      >
        <h1 className=" text-2xl font-bold">Profili Güncelle</h1>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Ad Soyad
          </label>
          <div className=" mt-2 rounded-md shadow-sm">
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              name="email"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="John Dow"
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium mt-2 leading-6 text-gray-900"
            >
              Photo Url
            </label>
            <div className=" mt-2 rounded-md shadow-sm">
              <input
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                type="text"
                name="file"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            className="inline-flex items-center mt-4  cursor-pointer px-4 py-2 border border-transparent bg-blue-700 rounded-md text-white"
            type="submit"
          >
            Güncelle
          </button>
        </div>
      </form>

      <form
        onSubmit={handleChangePass}
        className="w-full  max-w-xl mx-auto  mt-10  gap-y-4 mb-5"
      >
        <h1 className=" text-2xl font-bold">Şifreyi Güncelle</h1>
        <div>
          <label
            htmlFor="pass"
            className="block text-sm font-medium mt-2 leading-6 text-gray-900"
          >
            Yeni Şifre
          </label>
          <div className=" mt-2 rounded-md shadow-sm">
            <input
              value={newPass}
              onChange={(e) => setPass(e.target.value)}
              type="text"
              name="pass"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          className="inline-flex items-center mt-4  cursor-pointer px-4 py-2 border border-transparent bg-blue-700 rounded-md text-white"
          type="submit"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
