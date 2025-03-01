import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { 
  IconMail, 
  IconUser, 
  IconCalendar, 
  IconMapPin,
  IconBuildingHospital,
  IconStethoscope 
} from "@tabler/icons-react";

const Profile = () => {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();

  useEffect(() => {
    if (!currentUser) {
      fetchUserByEmail(user?.email?.address);
    }
  }, [currentUser, fetchUserByEmail]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-xl text-gray-500">
          <IconStethoscope className="mr-2 inline-block h-6 w-6 animate-bounce" />
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-4 max-w-4xl px-2 sm:mt-8 sm:px-4">
      <div className="overflow-hidden rounded-xl bg-gradient-to-b from-[#1c1c24] to-[#13131a] shadow-[0_0_40px_rgba(0,255,0,0.1)]">
        {/* Animated Header Section */}
        <div className="relative h-36 sm:h-48 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-[size:200%] animate-gradient">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSI2NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik03MzEuMjA3IDY0OS44MDJDOTM1LjQ4NCA2NDkuODAyIDExMDIuMDIgNTA2LjI4NiAxMTAyLjAyIDMyOC41YzAtMTc3Ljc4NC0xNjYuNTM2LTMyMS4zLTM3MC44MTMtMzIxLjNTMzYwLjM5NCAxNTAuNzE2IDM2MC4zOTQgMzI4LjVjMCAxNzcuNzg2IDE2Ni41MzYgMzIxLjMwMiAzNzAuODEzIDMyMS4zMDJ6IiBmaWxsPSIjRjdGN0Y3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')] bg-center opacity-10"></div>
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2">
            <div className="group relative">
              <div className="absolute -inset-0.5 animate-tilt rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
              <div className="relative flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center rounded-full border-4 border-[#1c1c24] bg-[#13131a] shadow-2xl">
                <span className="text-5xl sm:text-7xl transition-transform duration-300 ease-in-out group-hover:scale-110">😊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-20 sm:mt-24 px-4 sm:px-8 pb-8 sm:pb-12">
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-3xl sm:text-4xl font-bold text-transparent">
              {currentUser.username}
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-medium text-gray-400">
              <IconBuildingHospital className="mr-2 inline-block h-4 w-4 sm:h-5 sm:w-5" />
              Medical Profile
            </p>
          </div>

          {/* Profile Details Grid */}
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* Email */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 blur transition duration-300 group-hover:opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl bg-[#1f1f27] p-4 sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#2a2a35]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="rounded-full bg-blue-500/10 p-3 sm:p-4">
                    <IconMail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Email</p>
                    <p className="text-sm sm:text-lg font-semibold text-white break-all">{currentUser.createdBy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 opacity-0 blur transition duration-300 group-hover:opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl bg-[#1f1f27] p-4 sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#2a2a35]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="rounded-full bg-green-500/10 p-3 sm:p-4">
                    <IconUser className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Username</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{currentUser.username}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 blur transition duration-300 group-hover:opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl bg-[#1f1f27] p-4 sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#2a2a35]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="rounded-full bg-purple-500/10 p-3 sm:p-4">
                    <IconCalendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Age</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{currentUser.age} years old</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 blur transition duration-300 group-hover:opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl bg-[#1f1f27] p-4 sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#2a2a35]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="rounded-full bg-orange-500/10 p-3 sm:p-4">
                    <IconMapPin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Location</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{currentUser.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
