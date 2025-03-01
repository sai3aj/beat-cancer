import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { Home, Profile, Onboarding } from "./pages";
import MedicalRecords from "./pages/records/index";
import ScreeningSchedule from "./pages/ScreeningSchedule";
import SingleRecordDetails from "./pages/records/single-record-details";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "./context";

const App = () => {
  const { ready, authenticated, user } = usePrivy();
  const { checkUserExists } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAndRedirect = async () => {
      console.log('Checking auth state:', { ready, authenticated, user });

      if (ready && authenticated && user?.email?.address) {
        try {
          const userExists = await checkUserExists(user.email.address);
          if (userExists === undefined) {
            console.error('Error checking user existence');
            return;
          }
          console.log('User exists check:', userExists);

          if (!userExists) {
            console.log('Email not found in database, redirecting to onboarding...');
            navigate("/onboarding");
          } else {
            console.log('User found in database, proceeding normally...');
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }
    };

    checkAndRedirect();

    return () => {
      mounted = false;
    };
  }, [ready, authenticated, user, checkUserExists, navigate]);

  if (!ready) {
    return null; // or a loading spinner
  }

  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
