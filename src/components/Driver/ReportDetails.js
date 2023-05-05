import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {  useNavigate } from "react-router-dom";

const BookingList = ({ trip }) => {
  const navigate= useNavigate()
  return (
    <>
    {console.log(trip)}
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                
                                <td className="py-3 px-6 text-center ">
                                    <div className="flex items-center justify-center">
                                     {trip?.date}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center">
                                    {trip?.location?.pickup}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center">
                                    {trip?.location?.amount}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center">
                                    {trip?.payment?.amount}
                                    </div>
                                </td>
                                
                            </tr>
                           
                        </tbody>
                    

      
    </>
  );
};

export default BookingList;