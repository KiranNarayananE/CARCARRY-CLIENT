import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axiosInstance from "../../api/axios";

const RideRating = ({rating,setRating,setTrips,id,rated}) => {
  
 
  const token = useSelector((state) => state.userLogin.token);

  
  const submit = async (token) => {
    try {
      const response = await axiosInstance.post("/rating", {rating,id},{ headers: { Authorization: `Bearer ${token}` } });
      return response;
    } catch (error) {
      return error.response;
    }
  };  
const submitRating = async () => {
  const response = await submit(token);
  if (response.status === 201) return setTrips(response.data.trips)
  if (response.status === 200) return setTrips(response.data.trips);
  if (response.status === 500) return;
};

  return (
    <>
{!rated?
     <div class=" bg-white  flex flex-col justify-center ">
  <div class="py-3 sm:max-w-xl sm:mx-auto">
    <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
      <div class="px-12 py-5">
        <h2 class="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
      </div>
      <div class="bg-gray-200 w-full flex flex-col items-center">
        <div class="flex flex-col items-center py-6 space-y-3">
          <span class="text-lg text-gray-800">How was quality of the ride?</span>
          <div class="flex space-x-3">
          <div className="rating rating-lg">
         
  {rating==1||rating==0?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked onClick={()=>setRating(1)}/>:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={()=>setRating(1)}/>}
  {rating==2?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked onClick={()=>setRating(2)}/>:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={()=>setRating(2)}/>}
  {rating==3?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked onClick={()=>setRating(3)}/>:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={()=>setRating(3)} />}
  {rating==4?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked onClick={()=>setRating(4)}/>:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={()=>setRating(4)}/>}
  {rating==5?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked onClick={()=>setRating(5)}/>:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={()=>setRating(5)}/>}
</div>
          </div>
        </div>
        <div class="w-3/4 flex flex-col">
          <textarea rows="3" class="p-4 text-gray-500 rounded-xl resize-none">Leave a message, if you want</textarea>
          <button class="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white" onClick={()=>submitRating()}>Rate now</button>
        </div>
      </div>
      <div class="h-20 flex items-center justify-center">
        
      </div>
    </div>

  </div>
</div>:
<div class=" bg-white  flex flex-col justify-center ">
  <div class="py-3 sm:max-w-xl sm:mx-auto">
    <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
      <div class="px-12 py-5">
        <h2 class="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
      </div>
      <div class="bg-gray-200 w-full flex flex-col items-center">
        <div class="flex flex-col items-center py-6 space-y-3">
          <span class="text-lg text-gray-800">ThankYou For Rating Us! You Helped Us Being Better</span>
          <div class="flex space-x-3">
          <div className="rating rating-lg">
         
  {rated==1?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />}
  {rated==2?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />}
  {rated==3?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"  />}
  {rated==4?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />}
  {rated==5?<input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />:
  <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />}
</div>
          </div>
        </div>
        <div class="w-3/4 flex flex-col mb-4">
        {rated<3?
          <textarea rows="3"  class="p-4 text-gray-500 rounded-xl resize-none disabled:border-slate-200" disabled>Sorry for your poor Experience We are seeing into it</textarea>:
          <textarea rows="3"  class="p-4 text-gray-500 rounded-xl resize-none user-select-none" disabled>Happy you had a good ride .Continue choosing us </textarea>
        }
          
        </div>
      </div>
      <div class="h-20 flex items-center justify-center">
        
      </div>
    </div>

  </div>
</div>
}
    </>
  );
};

export default RideRating;