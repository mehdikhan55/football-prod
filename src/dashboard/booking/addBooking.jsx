import React from 'react'
import AddBookingForm from '../../components/booking/addBookingForm'
import AdminSiderbar from '../../components/sidebar/sidebar'

const AddBooking = () => {
  return (
    <div className="">
      <AdminSiderbar />
      <div className="flex flex-col justify-center gap-4 w-full max-sm:w-full max-md:w-2/3">
      <AddBookingForm/>
    </div>
    </div>
  )
}

export default AddBooking
