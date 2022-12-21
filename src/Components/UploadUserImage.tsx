import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface UploadUserImageProps {
  setUploadImageIsShowing: Dispatch<SetStateAction<boolean>>;
  uploadImageIsShowing: boolean;
  setUser: Dispatch<
    SetStateAction<{ _id?: string; firstName?: string; avatarUrl?: string }>
  >;
  user: { _id?: string; firstName?: string; avatarUrl?: string };
  setSelectedButton: Dispatch<SetStateAction<string>>;
  selectedButton: string;
}

const UploadUserImage: React.FC<UploadUserImageProps> = ({
  setUploadImageIsShowing,
  uploadImageIsShowing,
  user,
  setUser,
  setSelectedButton,
  selectedButton,
}) => {
  const [aboutToExit, setAboutToExit] = useState<boolean>(false);
  const exit = { y: 100, opacity: 0 };
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user._id) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("userId", user._id);
      const result = await axios.post(
        "https://notely.onrender.com/api/v1/image/userImage",
        formData
      );
      console.log(result.data);
      setUser({
        _id: user._id,
        firstName: user.firstName,
        avatarUrl: result.data.secure_url,
      });
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          !aboutToExit
            ? { opacity: 0.6, transition: { duration: 0.4 } }
            : { opacity: 0, transition: { duration: 0.4 } }
        }
        onClick={() => {
          setAboutToExit(true);
          if (selectedButton !== "All Notes") {
            setSelectedButton("All Notes");
          }
          setTimeout(() => setUploadImageIsShowing(false), 400);
        }}
        className="w-full h-full fixed flex items-center justify-center bg-transparent bg-black"
      ></motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={
          !aboutToExit
            ? {
                y: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeInOut" },
              }
            : exit
        }
        className="fixed w-[300px] h-[320px] rounded-[40px] bg-white dark:bg-[#0d1117] px-7 left-[calc(50%-150px)] top-[calc(50%-160px)]"
      >
        <figure className="flex flex-col items-center">
          {!user.avatarUrl && (
            <div className="w-[180px] h-[180px] mt-[40px] rounded-[30px] bg-[#8D6E6E] flex items-center justify-center text-8xl text-white">
              {user.firstName?.slice(0, 1)}
            </div>
          )}
          {user.avatarUrl && (
            <div className="w-[180px] h-[180px] mt-[40px] rounded-[30px] bg-[#8D6E6E] flex items-center justify-center text-8xl text-white overflow-hidden">
              <img
                alt="profile pic"
                className="w-full h-full"
                src={user.avatarUrl}
              />
            </div>
          )}
        </figure>
        <button
          className="w-full  rounded-xl py-2 mt-8 text-base bg-gray-200 dark:bg-[#010409] dark:text-white text-black "
          onClick={() => document.getElementById("getFile")?.click()}
        >
          Upload Profile Pic
        </button>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          id="getFile"
          name="image"
          className="hidden"
          onChange={onFileChange}
        />
      </motion.div>
    </>
  );
};
export default UploadUserImage;
