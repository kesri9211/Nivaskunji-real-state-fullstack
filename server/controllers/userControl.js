import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// function to create a new user
export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");
  let { email } = req.body;
  //create new user only if the email does not exist
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User created successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already exists" });
});

// function to book a visit
export const bookVisit = asyncHandler(async (req, res) => {
    // Get the email and date from the request body
    const { email, date } = req.body;
    const { id } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the residency is already booked by the user
      if (user.bookedVisits.some((visit) => visit.id === id)) {
        return res.status(400).json({ message: "This residency is already booked by you" });
      }
  
      // If not, proceed to book the visit
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
  
      res.send("Your visit is booked successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to add a residency in fav list of a user
export const toFav =asyncHandler (async(req,res)=>{
    const {email}=req.body;
    const {rid}=req.params;

    try{
        const user=await prisma.user.findUnique({
            where:{email}
        })
        if(user.favResidenciesID.includes(rid)){
            //remove
            const updateUser=await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        set:user.favResidenciesID.filter((id)=>id!==rid)
                    }
                }
            });
            res.send({message:"Removed from favorities", user:updateUser})
        }
        //add
        else{
            const updateUser=await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            });
            res.send({message:"updated favorities",user:updateUser})
        }
    }
    catch(err){
        throw new Error(err.message);
    }
});

//funtion to get all favoirites of a user
export const getAllFav = asyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const favResd=await prisma.user.findUnique({
            where:{email},
            select:{favResidenciesID:true}
        });
        res.status(200).send(favResd);
    }
    catch(err){
        throw new Error(err.message);
    }
});
