/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import PendingList from "./PendingList";
import ConfirmList from "./ConfirmList";
import CancelledList from "./CancelledList";

const UserDrive = () => {
  const token = useSelector((state) => state.userLogin.token);

  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [confirmTrip, setConfirmTrips] = useState([]);
  const [pendingTrip, setPendingTrips] = useState([]);
  const [finishedTrip, setFinishedTrips] = useState([]);
  const [cancelledTrip, setcancelledTrip] = useState([]);
  
 const getTrips = async (token) => {
    try {
      const response = await axiosInstance.get("/get-trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response;
    } catch (error) {
      return error.response;
    }
}

  const fetchTrips = async () => {
    const response = await getTrips(token);
    const data = response.data;
    if (response.status === 200) {
      setTrips(data.trip);
      const bookingComfrim = data.trip.filter((trip) => trip.bookingStatus === "Conform"||trip.bookingStatus === "Reached Pickup Location"||trip.bookingStatus === "Started To Destination");
      const bookingPending = data.trip.filter((trip) => trip.bookingStatus === "Pending");
      const bookPending = data.trip.filter((trip) => trip.bookingStatus === "Driver_Canceled");
      const bookingCompleted = data.trip.filter((trip) => trip.bookingStatus === "finished");
      const bookingCancelled = data.trip.filter((trip) => trip.bookingStatus === "Cancelled");
      setConfirmTrips(bookingComfrim);
      setPendingTrips([...bookingPending, ...bookPending]);
      setFinishedTrips(bookingCompleted);
      setcancelledTrip(bookingCancelled);
    }
    if (response.status === 500) return navigate("/error");
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <>
      {trips.length !== 0 ? (
        <>
          <section class="text-gray-900 bg-white body-font">
            <div class="container px-5 md:py-24 py-10 mx-auto ">
              <div class="flex flex-col text-start w-full mb-20">
                <h1 className="text-4xl font-medium  mb-4 text-white bg-regal-blue h-14 rounded-[50px] text-center shadow-[1px_1px_2px_2px_grey]">Bookings</h1>
              </div>
              <ConfirmList trips={confirmTrip} fetch={fetchTrips} />
              <PendingList trips={pendingTrip} fetch={fetchTrips} />  
    
              <CancelledList trips={cancelledTrip} />
            </div>
          </section>
        </>
      ) : (
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Pending Bookings</h1>
            </div>
            <div class="flex justify-center ">
              <div class="lg:w-1/3 md:w-1/2 w-full">
                <div class="h-full flex items-center w-full  justify-center">
                  <h1 className="text-gray-700 text-xl">No Booking has been made yet</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserDrive;
