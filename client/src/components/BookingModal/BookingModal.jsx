import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

/*
mantine is a react component library that provides a set of reusable components that can be used to build a website.
modal is a mantine component that is used to display a modal dialog box.
model is used when user will click on the book visit button.
calender -> date picker
when we have to update data on database we use useMutation hook instead of react-query.
*/

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
//value is a state variable that is used to store the value of the date selected by the user.
  const [value, setValue] = useState(null);

  const {userDetails: { token }, setUserDetails,} = useContext(UserDetailContext);
  //console.log(token)

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    }); //adding booking to the user details
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false)
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)} // close the modal when the user clicks the close button
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{gap: "1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
